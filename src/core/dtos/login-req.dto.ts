export interface LoginReqDto {
  Email: string
  Password: string
  GrantType: string
  Scope: string
  ClientId: string
  ClientSecret: string
  RedirectUri: string
}
