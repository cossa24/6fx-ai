const TWENTY_API_URL = process.env.TWENTY_API_URL || "https://twenty-production-3e6b.up.railway.app";
const TWENTY_API_KEY = process.env.TWENTY_CRM_API_KEY;

interface CreatePersonInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName: string;
}

interface CreateCompanyInput {
  name: string;
  domainName?: string;
  employees?: number;
  industry?: string;
}

interface TwentyResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function createCompany(input: CreateCompanyInput): Promise<string | null> {
  if (!TWENTY_API_KEY) {
    console.warn("TWENTY_CRM_API_KEY not set, skipping CRM sync");
    return null;
  }

  const mutation = `
    mutation CreateCompany($input: CompanyCreateInput!) {
      createCompany(data: $input) {
        id
        name
        employees
        domainName {
          primaryLinkUrl
          primaryLinkLabel
        }
        address {
          addressCity
        }
      }
    }
  `;

  try {
    const response = await fetch(`${TWENTY_API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TWENTY_API_KEY}`,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            name: input.name,
            employees: input.employees,
            ...(input.domainName && {
              domainName: {
                primaryLinkUrl: input.domainName,
                primaryLinkLabel: "Website",
              },
            }),
            ...(input.industry && {
              address: {
                addressCity: input.industry,
              },
            }),
          },
        },
      }),
    });

    const result: TwentyResponse<{ createCompany: { id: string } }> = await response.json();

    if (result.errors) {
      console.error("Twenty createCompany error:", result.errors);
      return null;
    }

    return result.data.createCompany.id;
  } catch (error) {
    console.error("Twenty API error:", error);
    return null;
  }
}

export async function createPerson(input: CreatePersonInput, companyId?: string): Promise<string | null> {
  if (!TWENTY_API_KEY) {
    console.warn("TWENTY_CRM_API_KEY not set, skipping CRM sync");
    return null;
  }

  const mutation = `
    mutation CreatePerson($input: PersonCreateInput!) {
      createPerson(data: $input) {
        id
        name {
          firstName
          lastName
        }
        emails {
          primaryEmail
        }
        phones {
          primaryPhoneNumber
          primaryPhoneCountryCode
        }
        company {
          id
          name
        }
      }
    }
  `;

  try {
    // Parse phone number to extract country code
    let phoneData = undefined;
    if (input.phone) {
      const phoneMatch = input.phone.match(/^\+?(\d{1,3})?[\s.-]?(.+)$/);
      if (phoneMatch) {
        phoneData = {
          primaryPhoneNumber: input.phone,
          primaryPhoneCountryCode: phoneMatch[1] || "1",
        };
      } else {
        phoneData = {
          primaryPhoneNumber: input.phone,
        };
      }
    }

    const response = await fetch(`${TWENTY_API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TWENTY_API_KEY}`,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            name: {
              firstName: input.firstName,
              lastName: input.lastName,
            },
            emails: {
              primaryEmail: input.email,
            },
            phones: phoneData,
            companyId: companyId,
          },
        },
      }),
    });

    const result: TwentyResponse<{ createPerson: { id: string } }> = await response.json();

    if (result.errors) {
      console.error("Twenty createPerson error:", result.errors);
      return null;
    }

    return result.data.createPerson.id;
  } catch (error) {
    console.error("Twenty API error:", error);
    return null;
  }
}

export async function syncLeadToCRM(lead: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName: string;
  companySize: string;
  industry: string;
}): Promise<{ companyId: string | null; personId: string | null }> {
  // Parse company size to number
  const employeeMap: Record<string, number> = {
    "1-10": 5,
    "11-50": 30,
    "51-200": 125,
    "201-500": 350,
    "501-1000": 750,
    "1000+": 1500,
  };

  // Create company first
  const companyId = await createCompany({
    name: lead.companyName,
    employees: employeeMap[lead.companySize] || undefined,
    industry: lead.industry,
  });

  // Create person linked to company
  const personId = await createPerson({
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    companyName: lead.companyName,
  }, companyId || undefined);

  return { companyId, personId };
}
