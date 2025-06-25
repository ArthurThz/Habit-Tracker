import { ZodSchema } from "zod";

export async function fetchAndParse<T>(
  url: string,
  zodSchema: ZodSchema<T>,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      "An erro occurred during your request, please try again later"
    );
  }

  const data = await response.json();

  console.log("DATA LIB", data);
  try {
    const parsedData = zodSchema.parse(data.data);
    console.log("PARSED DATA LIB", parsedData);
    return parsedData;
  } catch (error) {
    console.error("Zod validation error", error);
    throw error;
  }
}
