export class Assembly {
  async getPageUrlData(data: Pick<PageProps<"/">, "searchParams">) {
    const searchParams = await data.searchParams;
    console.log(searchParams);
    const token = searchParams.token;
    if (token && typeof token === "string") {
      return {
        token: searchParams.token,
        clientId: searchParams.clientId as string,
        companyId: searchParams.companyId as string,
      };
    }

    throw new Error("Could not get the token.");
  }
}
