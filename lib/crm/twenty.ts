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
            domainName: input.domainName,
            employees: input.employees,
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
            name: {
              firstName: input.firstName,
              lastName: input.lastName,
            },
            emails: {
              primaryEmail: input.email,
            },
            phones: input.phone ? {
              primaryPhoneNumber: input.phone,
            } : undefined,
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
