export interface AppPageProps<P extends object = never, S extends object = object> {
  searchParams: Promise<{ token?: string } & S>;
  params: Promise<P>;
}
