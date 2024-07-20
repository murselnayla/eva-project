export interface UserInfoResDto {
  isLinkAccount: boolean
  linkAccountParameters: string
  user: User
}

export interface User {
  firstName: string
  lastName: string
  email: string
  isAdmin: boolean
  isSuperAdmin: boolean
  isWarehouseAdmin: boolean
  isStoreAdmin: boolean
  countryCode: null
  callingCode: null
  telephoneNumber: null
  accountStatus: number
  accountType: number
  accountSubscriptionList: null
  userId: string
  store: Store[]
  vendor: any[]
  walmartStore: any[]
  packageInformation: UserPackageInformation
  packages: any[]
  allPackages: AllPackages
  userPermissionList: any[]
}

export interface AllPackages {
  AllPackages: any[]
  UserAccountPackages: any[]
}

export interface UserPackageInformation {
  turnoverPackageInformation: TurnoverPackageInformation[]
  skuPackageInformation: SkuPackageInformation[]
  packageInformation: PackageInformationElement[]
}

export interface PackageInformationElement {
  subscriptionType: number
  pricingStatus: number
  packageName: string
  packageRank: number
  monthlyFee: number
  annualFee: number | null
  lowerLimit: number
  upperLimit: number
  lowerSkuLimit: number
  upperSkuLimit: number
}

export interface SkuPackageInformation {
  pricingStatus: number
  packageName: string
  packageDefinition: string
  lowerSkuCount: number
  upperSkuCount: number
}

export interface TurnoverPackageInformation {
  pricingStatus: number
  packageName: string
  monthlyFee: number
  lowerLimit: number
  upperLimit: number
  reimbursementCredit: number
}

export interface Store {
  storeName: string
  accountType: number
  storeId: string
  evaStoreId: string
  storeType: number
  region: string
  paidStatus: number
  pricingStatus: number
  linkedDate: string
  paidDate: string
  reimbursementPackageTrialEndDate: null
  unlimitedReimbursementStatus: number
  showSellerCentralExternalLink: boolean
  remainingReimbursementCredit: number
  monthlyReimbursementPackageCredit: number
  marketplaceName: string
  marketplaceCode: string
  enableRepricing: boolean
  screenPermissionList: null
  reimbursementStatus: boolean
  loanOfferAmount: number
  subscriptionCancelationStatus: number
  subscriptionCancelationDate: null
  subscriptionPackageType: number
  subscriptionStatus: number
  subscriptionVersion: number
  hasReimbursementService: boolean
  isSubscriptionAnnual: boolean
  is3plStore: boolean
  isAdvertisingConnected: boolean
  sellerApiTokenStatus: number
  sellerApiAuthCodeCreatedAt: string
  advertisingAuditState: AdvertisingAuditState
}

export interface AdvertisingAuditState {
  advertisingAuditDisplayEndDate: string
  advertisingAuditDisplayStartDate: string
  displayAdvertisingAudit: boolean
}
