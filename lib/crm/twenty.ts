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
      console.error("[TwentyCRM] createCompany GraphQL errors:", JSON.stringify(result.errors, null, 2));
      return null;
    }

    if (!result.data?.createCompany?.id) {
      console.error("[TwentyCRM] createCompany returned no ID:", JSON.stringify(result, null, 2));
      return null;
    }

    console.log("[TwentyCRM] Company created successfully:", result.data.createCompany.id);
    return result.data.createCompany.id;
  } catch (error) {
    console.error("[TwentyCRM] createCompany exception:", error instanceof Error ? error.message : error);
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
    // Parse phone number and set country code
    // TwentyCRM requires ISO country code (e.g., "US", "GB", "CA"), not numeric dialing code
    let phoneData = undefined;
    if (input.phone) {
      // For now, default to "US" for most numbers
      // Future enhancement: use libphonenumber-js for proper country detection
      phoneData = {
        primaryPhoneNumber: input.phone,
        primaryPhoneCountryCode: "US",
      };
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
      console.error("[TwentyCRM] createPerson GraphQL errors:", JSON.stringify(result.errors, null, 2));
      return null;
    }

    if (!result.data?.createPerson?.id) {
      console.error("[TwentyCRM] createPerson returned no ID:", JSON.stringify(result, null, 2));
      return null;
    }

    console.log("[TwentyCRM] Person created successfully:", result.data.createPerson.id);
    return result.data.createPerson.id;
  } catch (error) {
    console.error("[TwentyCRM] createPerson exception:", error instanceof Error ? error.message : error);
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
  console.log("[TwentyCRM] Starting CRM sync for:", {
    name: `${lead.firstName} ${lead.lastName}`,
    company: lead.companyName
  });

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
  console.log("[TwentyCRM] Creating company:", lead.companyName);
  const companyId = await createCompany({
    name: lead.companyName,
    employees: employeeMap[lead.companySize] || undefined,
    industry: lead.industry,
  });

  if (!companyId) {
    console.warn("[TwentyCRM] Company creation failed, continuing with person creation without company link");
  }

  // Create person linked to company
  console.log("[TwentyCRM] Creating person:", `${lead.firstName} ${lead.lastName}`);
  const personId = await createPerson({
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    companyName: lead.companyName,
  }, companyId || undefined);

  if (!personId) {
    console.error("[TwentyCRM] Person creation failed");
  }

  console.log("[TwentyCRM] Sync complete:", { companyId, personId });
  return { companyId, personId };
}
