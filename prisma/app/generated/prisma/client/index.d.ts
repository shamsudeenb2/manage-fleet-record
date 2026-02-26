
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>
/**
 * Model Driver
 * 
 */
export type Driver = $Result.DefaultSelection<Prisma.$DriverPayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model TruckDriver
 * 
 */
export type TruckDriver = $Result.DefaultSelection<Prisma.$TruckDriverPayload>
/**
 * Model Trip
 * 
 */
export type Trip = $Result.DefaultSelection<Prisma.$TripPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Fuel
 * 
 */
export type Fuel = $Result.DefaultSelection<Prisma.$FuelPayload>
/**
 * Model Part
 * 
 */
export type Part = $Result.DefaultSelection<Prisma.$PartPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model Repair
 * 
 */
export type Repair = $Result.DefaultSelection<Prisma.$RepairPayload>
/**
 * Model Tire
 * 
 */
export type Tire = $Result.DefaultSelection<Prisma.$TirePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  DATA_ENTRY: 'DATA_ENTRY',
  MANAGER: 'MANAGER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const WorkOrderStatus: {
  PENDING: 'PENDING',
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type WorkOrderStatus = (typeof WorkOrderStatus)[keyof typeof WorkOrderStatus]


export const FuelType: {
  DIESEL: 'DIESEL',
  PETROL: 'PETROL',
  CNG: 'CNG',
  ELECTRIC: 'ELECTRIC',
  LPG: 'LPG',
  OTHER: 'OTHER'
};

export type FuelType = (typeof FuelType)[keyof typeof FuelType]


export const TireActionType: {
  Installed: 'Installed',
  Rotated: 'Rotated',
  Removed: 'Removed',
  OTHER: 'OTHER'
};

export type TireActionType = (typeof TireActionType)[keyof typeof TireActionType]


export const TripStatus: {
  PLANNED: 'PLANNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type TripStatus = (typeof TripStatus)[keyof typeof TripStatus]


export const ServiceStatus: {
  SCHEDULED: 'SCHEDULED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus]


export const ServiceType: {
  OIL_CHANGE: 'OIL_CHANGE',
  PERIODIC_INSPECTION: 'PERIODIC_INSPECTION',
  AIR_FILTER: 'AIR_FILTER',
  FULL_SERVICE: 'FULL_SERVICE',
  GENERATOR: 'GENERATOR',
  OTHER: 'OTHER'
};

export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType]


export const RepairStatus: {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type RepairStatus = (typeof RepairStatus)[keyof typeof RepairStatus]


export const RepairPriority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type RepairPriority = (typeof RepairPriority)[keyof typeof RepairPriority]


export const TireStatus: {
  FITTED: 'FITTED',
  REPLACED: 'REPLACED',
  RETREADED: 'RETREADED',
  SCRAPPED: 'SCRAPPED'
};

export type TireStatus = (typeof TireStatus)[keyof typeof TireStatus]


export const TirePosition: {
  FRONT_LEFT: 'FRONT_LEFT',
  FRONT_RIGHT: 'FRONT_RIGHT',
  REAR_LEFT_INNER: 'REAR_LEFT_INNER',
  REAR_LEFT_OUTER: 'REAR_LEFT_OUTER',
  REAR_RIGHT_INNER: 'REAR_RIGHT_INNER',
  REAR_RIGHT_OUTER: 'REAR_RIGHT_OUTER',
  SPARE: 'SPARE',
  OTHER: 'OTHER'
};

export type TirePosition = (typeof TirePosition)[keyof typeof TirePosition]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type WorkOrderStatus = $Enums.WorkOrderStatus

export const WorkOrderStatus: typeof $Enums.WorkOrderStatus

export type FuelType = $Enums.FuelType

export const FuelType: typeof $Enums.FuelType

export type TireActionType = $Enums.TireActionType

export const TireActionType: typeof $Enums.TireActionType

export type TripStatus = $Enums.TripStatus

export const TripStatus: typeof $Enums.TripStatus

export type ServiceStatus = $Enums.ServiceStatus

export const ServiceStatus: typeof $Enums.ServiceStatus

export type ServiceType = $Enums.ServiceType

export const ServiceType: typeof $Enums.ServiceType

export type RepairStatus = $Enums.RepairStatus

export const RepairStatus: typeof $Enums.RepairStatus

export type RepairPriority = $Enums.RepairPriority

export const RepairPriority: typeof $Enums.RepairPriority

export type TireStatus = $Enums.TireStatus

export const TireStatus: typeof $Enums.TireStatus

export type TirePosition = $Enums.TirePosition

export const TirePosition: typeof $Enums.TirePosition

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.driver`: Exposes CRUD operations for the **Driver** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drivers
    * const drivers = await prisma.driver.findMany()
    * ```
    */
  get driver(): Prisma.DriverDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.truckDriver`: Exposes CRUD operations for the **TruckDriver** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TruckDrivers
    * const truckDrivers = await prisma.truckDriver.findMany()
    * ```
    */
  get truckDriver(): Prisma.TruckDriverDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trip`: Exposes CRUD operations for the **Trip** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trips
    * const trips = await prisma.trip.findMany()
    * ```
    */
  get trip(): Prisma.TripDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fuel`: Exposes CRUD operations for the **Fuel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fuels
    * const fuels = await prisma.fuel.findMany()
    * ```
    */
  get fuel(): Prisma.FuelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.part`: Exposes CRUD operations for the **Part** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parts
    * const parts = await prisma.part.findMany()
    * ```
    */
  get part(): Prisma.PartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.repair`: Exposes CRUD operations for the **Repair** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Repairs
    * const repairs = await prisma.repair.findMany()
    * ```
    */
  get repair(): Prisma.RepairDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tire`: Exposes CRUD operations for the **Tire** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tires
    * const tires = await prisma.tire.findMany()
    * ```
    */
  get tire(): Prisma.TireDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    PasswordResetToken: 'PasswordResetToken',
    Driver: 'Driver',
    Vehicle: 'Vehicle',
    TruckDriver: 'TruckDriver',
    Trip: 'Trip',
    Customer: 'Customer',
    Fuel: 'Fuel',
    Part: 'Part',
    Service: 'Service',
    Repair: 'Repair',
    Tire: 'Tire'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "passwordResetToken" | "driver" | "vehicle" | "truckDriver" | "trip" | "customer" | "fuel" | "part" | "service" | "repair" | "tire"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
      Driver: {
        payload: Prisma.$DriverPayload<ExtArgs>
        fields: Prisma.DriverFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DriverFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DriverFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          findFirst: {
            args: Prisma.DriverFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DriverFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          findMany: {
            args: Prisma.DriverFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          create: {
            args: Prisma.DriverCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          createMany: {
            args: Prisma.DriverCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DriverCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          delete: {
            args: Prisma.DriverDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          update: {
            args: Prisma.DriverUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          deleteMany: {
            args: Prisma.DriverDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DriverUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DriverUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          upsert: {
            args: Prisma.DriverUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          aggregate: {
            args: Prisma.DriverAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDriver>
          }
          groupBy: {
            args: Prisma.DriverGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriverGroupByOutputType>[]
          }
          count: {
            args: Prisma.DriverCountArgs<ExtArgs>
            result: $Utils.Optional<DriverCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      TruckDriver: {
        payload: Prisma.$TruckDriverPayload<ExtArgs>
        fields: Prisma.TruckDriverFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TruckDriverFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TruckDriverPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TruckDriverFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TruckDriverPayload>
          }
          findFirst: {
            args: Prisma.TruckDriverFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TruckDriverPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TruckDriverFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TruckDriverPayload>
          }
          findMany: {
            args: Prisma.TruckDriverFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TruckDriverPayload>[]
          }
          create: {
            args: Prisma.TruckDriverCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TruckDriverPayload>
          }
          createMany: {
            args: Prisma.TruckDriverCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TruckDriverCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TruckDriverPayload>[]
          }
          delete: {
            args: Prisma.TruckDriverDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TruckDriverPayload>
          }
          update: {
            args: Prisma.TruckDriverUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TruckDriverPayload>
          }
          deleteMany: {
            args: Prisma.TruckDriverDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TruckDriverUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TruckDriverUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TruckDriverPayload>[]
          }
          upsert: {
            args: Prisma.TruckDriverUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TruckDriverPayload>
          }
          aggregate: {
            args: Prisma.TruckDriverAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTruckDriver>
          }
          groupBy: {
            args: Prisma.TruckDriverGroupByArgs<ExtArgs>
            result: $Utils.Optional<TruckDriverGroupByOutputType>[]
          }
          count: {
            args: Prisma.TruckDriverCountArgs<ExtArgs>
            result: $Utils.Optional<TruckDriverCountAggregateOutputType> | number
          }
        }
      }
      Trip: {
        payload: Prisma.$TripPayload<ExtArgs>
        fields: Prisma.TripFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TripFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TripFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          findFirst: {
            args: Prisma.TripFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TripFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          findMany: {
            args: Prisma.TripFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>[]
          }
          create: {
            args: Prisma.TripCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          createMany: {
            args: Prisma.TripCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TripCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>[]
          }
          delete: {
            args: Prisma.TripDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          update: {
            args: Prisma.TripUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          deleteMany: {
            args: Prisma.TripDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TripUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TripUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>[]
          }
          upsert: {
            args: Prisma.TripUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          aggregate: {
            args: Prisma.TripAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrip>
          }
          groupBy: {
            args: Prisma.TripGroupByArgs<ExtArgs>
            result: $Utils.Optional<TripGroupByOutputType>[]
          }
          count: {
            args: Prisma.TripCountArgs<ExtArgs>
            result: $Utils.Optional<TripCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Fuel: {
        payload: Prisma.$FuelPayload<ExtArgs>
        fields: Prisma.FuelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FuelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FuelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelPayload>
          }
          findFirst: {
            args: Prisma.FuelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FuelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelPayload>
          }
          findMany: {
            args: Prisma.FuelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelPayload>[]
          }
          create: {
            args: Prisma.FuelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelPayload>
          }
          createMany: {
            args: Prisma.FuelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FuelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelPayload>[]
          }
          delete: {
            args: Prisma.FuelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelPayload>
          }
          update: {
            args: Prisma.FuelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelPayload>
          }
          deleteMany: {
            args: Prisma.FuelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FuelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FuelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelPayload>[]
          }
          upsert: {
            args: Prisma.FuelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelPayload>
          }
          aggregate: {
            args: Prisma.FuelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFuel>
          }
          groupBy: {
            args: Prisma.FuelGroupByArgs<ExtArgs>
            result: $Utils.Optional<FuelGroupByOutputType>[]
          }
          count: {
            args: Prisma.FuelCountArgs<ExtArgs>
            result: $Utils.Optional<FuelCountAggregateOutputType> | number
          }
        }
      }
      Part: {
        payload: Prisma.$PartPayload<ExtArgs>
        fields: Prisma.PartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findFirst: {
            args: Prisma.PartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findMany: {
            args: Prisma.PartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          create: {
            args: Prisma.PartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          createMany: {
            args: Prisma.PartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          delete: {
            args: Prisma.PartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          update: {
            args: Prisma.PartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          deleteMany: {
            args: Prisma.PartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PartUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          upsert: {
            args: Prisma.PartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          aggregate: {
            args: Prisma.PartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePart>
          }
          groupBy: {
            args: Prisma.PartGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartCountArgs<ExtArgs>
            result: $Utils.Optional<PartCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      Repair: {
        payload: Prisma.$RepairPayload<ExtArgs>
        fields: Prisma.RepairFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepairFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepairFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>
          }
          findFirst: {
            args: Prisma.RepairFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepairFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>
          }
          findMany: {
            args: Prisma.RepairFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>[]
          }
          create: {
            args: Prisma.RepairCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>
          }
          createMany: {
            args: Prisma.RepairCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RepairCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>[]
          }
          delete: {
            args: Prisma.RepairDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>
          }
          update: {
            args: Prisma.RepairUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>
          }
          deleteMany: {
            args: Prisma.RepairDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RepairUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RepairUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>[]
          }
          upsert: {
            args: Prisma.RepairUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>
          }
          aggregate: {
            args: Prisma.RepairAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRepair>
          }
          groupBy: {
            args: Prisma.RepairGroupByArgs<ExtArgs>
            result: $Utils.Optional<RepairGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepairCountArgs<ExtArgs>
            result: $Utils.Optional<RepairCountAggregateOutputType> | number
          }
        }
      }
      Tire: {
        payload: Prisma.$TirePayload<ExtArgs>
        fields: Prisma.TireFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TireFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TirePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TireFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TirePayload>
          }
          findFirst: {
            args: Prisma.TireFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TirePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TireFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TirePayload>
          }
          findMany: {
            args: Prisma.TireFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TirePayload>[]
          }
          create: {
            args: Prisma.TireCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TirePayload>
          }
          createMany: {
            args: Prisma.TireCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TireCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TirePayload>[]
          }
          delete: {
            args: Prisma.TireDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TirePayload>
          }
          update: {
            args: Prisma.TireUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TirePayload>
          }
          deleteMany: {
            args: Prisma.TireDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TireUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TireUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TirePayload>[]
          }
          upsert: {
            args: Prisma.TireUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TirePayload>
          }
          aggregate: {
            args: Prisma.TireAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTire>
          }
          groupBy: {
            args: Prisma.TireGroupByArgs<ExtArgs>
            result: $Utils.Optional<TireGroupByOutputType>[]
          }
          count: {
            args: Prisma.TireCountArgs<ExtArgs>
            result: $Utils.Optional<TireCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    passwordResetToken?: PasswordResetTokenOmit
    driver?: DriverOmit
    vehicle?: VehicleOmit
    truckDriver?: TruckDriverOmit
    trip?: TripOmit
    customer?: CustomerOmit
    fuel?: FuelOmit
    part?: PartOmit
    service?: ServiceOmit
    repair?: RepairOmit
    tire?: TireOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DriverCountOutputType
   */

  export type DriverCountOutputType = {
    trips: number
    services: number
    repairs: number
    truckDriver: number
  }

  export type DriverCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trips?: boolean | DriverCountOutputTypeCountTripsArgs
    services?: boolean | DriverCountOutputTypeCountServicesArgs
    repairs?: boolean | DriverCountOutputTypeCountRepairsArgs
    truckDriver?: boolean | DriverCountOutputTypeCountTruckDriverArgs
  }

  // Custom InputTypes
  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverCountOutputType
     */
    select?: DriverCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeCountTripsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TripWhereInput
  }

  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeCountRepairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairWhereInput
  }

  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeCountTruckDriverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TruckDriverWhereInput
  }


  /**
   * Count Type VehicleCountOutputType
   */

  export type VehicleCountOutputType = {
    trips: number
    truckDriver: number
    services: number
    repairs: number
    parts: number
    tires: number
  }

  export type VehicleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trips?: boolean | VehicleCountOutputTypeCountTripsArgs
    truckDriver?: boolean | VehicleCountOutputTypeCountTruckDriverArgs
    services?: boolean | VehicleCountOutputTypeCountServicesArgs
    repairs?: boolean | VehicleCountOutputTypeCountRepairsArgs
    parts?: boolean | VehicleCountOutputTypeCountPartsArgs
    tires?: boolean | VehicleCountOutputTypeCountTiresArgs
  }

  // Custom InputTypes
  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleCountOutputType
     */
    select?: VehicleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountTripsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TripWhereInput
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountTruckDriverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TruckDriverWhereInput
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountRepairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairWhereInput
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountTiresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TireWhereInput
  }


  /**
   * Count Type TripCountOutputType
   */

  export type TripCountOutputType = {
    customer: number
    fuels: number
  }

  export type TripCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | TripCountOutputTypeCountCustomerArgs
    fuels?: boolean | TripCountOutputTypeCountFuelsArgs
  }

  // Custom InputTypes
  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripCountOutputType
     */
    select?: TripCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeCountCustomerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
  }

  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeCountFuelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FuelWhereInput
  }


  /**
   * Count Type RepairCountOutputType
   */

  export type RepairCountOutputType = {
    parts: number
  }

  export type RepairCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parts?: boolean | RepairCountOutputTypeCountPartsArgs
  }

  // Custom InputTypes
  /**
   * RepairCountOutputType without action
   */
  export type RepairCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairCountOutputType
     */
    select?: RepairCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RepairCountOutputType without action
   */
  export type RepairCountOutputTypeCountPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordChangedAt: Date | null
    name: string | null
    profileImage: string | null
    role: $Enums.Role | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordChangedAt: Date | null
    name: string | null
    profileImage: string | null
    role: $Enums.Role | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordChangedAt: number
    name: number
    profileImage: number
    role: number
    password: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordChangedAt?: true
    name?: true
    profileImage?: true
    role?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordChangedAt?: true
    name?: true
    profileImage?: true
    role?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordChangedAt?: true
    name?: true
    profileImage?: true
    role?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordChangedAt: Date | null
    name: string | null
    profileImage: string
    role: $Enums.Role
    password: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordChangedAt?: boolean
    name?: boolean
    profileImage?: boolean
    role?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    passwordReset?: boolean | User$passwordResetArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordChangedAt?: boolean
    name?: boolean
    profileImage?: boolean
    role?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordChangedAt?: boolean
    name?: boolean
    profileImage?: boolean
    role?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordChangedAt?: boolean
    name?: boolean
    profileImage?: boolean
    role?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordChangedAt" | "name" | "profileImage" | "role" | "password" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passwordReset?: boolean | User$passwordResetArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      passwordReset: Prisma.$PasswordResetTokenPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordChangedAt: Date | null
      name: string | null
      profileImage: string
      role: $Enums.Role
      password: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    passwordReset<T extends User$passwordResetArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordResetArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordChangedAt: FieldRef<"User", 'DateTime'>
    readonly name: FieldRef<"User", 'String'>
    readonly profileImage: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.passwordReset
   */
  export type User$passwordResetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    where?: PasswordResetTokenWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    hashedToken: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    hashedToken: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    hashedToken: number
    userId: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    hashedToken?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    hashedToken?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    hashedToken?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    hashedToken: string
    userId: string
    expiresAt: Date
    createdAt: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hashedToken?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hashedToken?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hashedToken?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    hashedToken?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hashedToken" | "userId" | "expiresAt" | "createdAt", ExtArgs["result"]["passwordResetToken"]>
  export type PasswordResetTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      hashedToken: string
      userId: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetTokens and returns the data saved in the database.
     * @param {PasswordResetTokenCreateManyAndReturnArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens and returns the data updated in the database.
     * @param {PasswordResetTokenUpdateManyAndReturnArgs} args - Arguments to update many PasswordResetTokens.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PasswordResetTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly hashedToken: FieldRef<"PasswordResetToken", 'String'>
    readonly userId: FieldRef<"PasswordResetToken", 'String'>
    readonly expiresAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly createdAt: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken createManyAndReturn
   */
  export type PasswordResetTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken updateManyAndReturn
   */
  export type PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
  }


  /**
   * Model Driver
   */

  export type AggregateDriver = {
    _count: DriverCountAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  export type DriverMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    address: string | null
    profileImage: string | null
    licenseNo: string | null
    licenseExp: Date | null
    licenseImage: string | null
    accountName: string | null
    accountNumber: string | null
    bank: string | null
    guarantorForm: string | null
    fingerPrint: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type DriverMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    address: string | null
    profileImage: string | null
    licenseNo: string | null
    licenseExp: Date | null
    licenseImage: string | null
    accountName: string | null
    accountNumber: string | null
    bank: string | null
    guarantorForm: string | null
    fingerPrint: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type DriverCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    address: number
    profileImage: number
    licenseNo: number
    licenseExp: number
    licenseImage: number
    accountName: number
    accountNumber: number
    bank: number
    guarantorForm: number
    fingerPrint: number
    notes: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type DriverMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    address?: true
    profileImage?: true
    licenseNo?: true
    licenseExp?: true
    licenseImage?: true
    accountName?: true
    accountNumber?: true
    bank?: true
    guarantorForm?: true
    fingerPrint?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type DriverMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    address?: true
    profileImage?: true
    licenseNo?: true
    licenseExp?: true
    licenseImage?: true
    accountName?: true
    accountNumber?: true
    bank?: true
    guarantorForm?: true
    fingerPrint?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type DriverCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    address?: true
    profileImage?: true
    licenseNo?: true
    licenseExp?: true
    licenseImage?: true
    accountName?: true
    accountNumber?: true
    bank?: true
    guarantorForm?: true
    fingerPrint?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type DriverAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Driver to aggregate.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Drivers
    **/
    _count?: true | DriverCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriverMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriverMaxAggregateInputType
  }

  export type GetDriverAggregateType<T extends DriverAggregateArgs> = {
        [P in keyof T & keyof AggregateDriver]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriver[P]>
      : GetScalarType<T[P], AggregateDriver[P]>
  }




  export type DriverGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriverWhereInput
    orderBy?: DriverOrderByWithAggregationInput | DriverOrderByWithAggregationInput[]
    by: DriverScalarFieldEnum[] | DriverScalarFieldEnum
    having?: DriverScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriverCountAggregateInputType | true
    _min?: DriverMinAggregateInputType
    _max?: DriverMaxAggregateInputType
  }

  export type DriverGroupByOutputType = {
    id: string
    name: string
    phone: string | null
    address: string
    profileImage: string
    licenseNo: string | null
    licenseExp: Date | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: DriverCountAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  type GetDriverGroupByPayload<T extends DriverGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriverGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriverGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriverGroupByOutputType[P]>
            : GetScalarType<T[P], DriverGroupByOutputType[P]>
        }
      >
    >


  export type DriverSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    profileImage?: boolean
    licenseNo?: boolean
    licenseExp?: boolean
    licenseImage?: boolean
    accountName?: boolean
    accountNumber?: boolean
    bank?: boolean
    guarantorForm?: boolean
    fingerPrint?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | Driver$vehicleArgs<ExtArgs>
    trips?: boolean | Driver$tripsArgs<ExtArgs>
    services?: boolean | Driver$servicesArgs<ExtArgs>
    repairs?: boolean | Driver$repairsArgs<ExtArgs>
    truckDriver?: boolean | Driver$truckDriverArgs<ExtArgs>
    _count?: boolean | DriverCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    profileImage?: boolean
    licenseNo?: boolean
    licenseExp?: boolean
    licenseImage?: boolean
    accountName?: boolean
    accountNumber?: boolean
    bank?: boolean
    guarantorForm?: boolean
    fingerPrint?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    profileImage?: boolean
    licenseNo?: boolean
    licenseExp?: boolean
    licenseImage?: boolean
    accountName?: boolean
    accountNumber?: boolean
    bank?: boolean
    guarantorForm?: boolean
    fingerPrint?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    profileImage?: boolean
    licenseNo?: boolean
    licenseExp?: boolean
    licenseImage?: boolean
    accountName?: boolean
    accountNumber?: boolean
    bank?: boolean
    guarantorForm?: boolean
    fingerPrint?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type DriverOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "address" | "profileImage" | "licenseNo" | "licenseExp" | "licenseImage" | "accountName" | "accountNumber" | "bank" | "guarantorForm" | "fingerPrint" | "notes" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["driver"]>
  export type DriverInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | Driver$vehicleArgs<ExtArgs>
    trips?: boolean | Driver$tripsArgs<ExtArgs>
    services?: boolean | Driver$servicesArgs<ExtArgs>
    repairs?: boolean | Driver$repairsArgs<ExtArgs>
    truckDriver?: boolean | Driver$truckDriverArgs<ExtArgs>
    _count?: boolean | DriverCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DriverIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DriverIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DriverPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Driver"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs> | null
      trips: Prisma.$TripPayload<ExtArgs>[]
      services: Prisma.$ServicePayload<ExtArgs>[]
      repairs: Prisma.$RepairPayload<ExtArgs>[]
      truckDriver: Prisma.$TruckDriverPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string | null
      address: string
      profileImage: string
      licenseNo: string | null
      licenseExp: Date | null
      licenseImage: string
      accountName: string
      accountNumber: string
      bank: string
      guarantorForm: string
      fingerPrint: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["driver"]>
    composites: {}
  }

  type DriverGetPayload<S extends boolean | null | undefined | DriverDefaultArgs> = $Result.GetResult<Prisma.$DriverPayload, S>

  type DriverCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DriverFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriverCountAggregateInputType | true
    }

  export interface DriverDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Driver'], meta: { name: 'Driver' } }
    /**
     * Find zero or one Driver that matches the filter.
     * @param {DriverFindUniqueArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DriverFindUniqueArgs>(args: SelectSubset<T, DriverFindUniqueArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Driver that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DriverFindUniqueOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DriverFindUniqueOrThrowArgs>(args: SelectSubset<T, DriverFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Driver that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DriverFindFirstArgs>(args?: SelectSubset<T, DriverFindFirstArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Driver that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DriverFindFirstOrThrowArgs>(args?: SelectSubset<T, DriverFindFirstOrThrowArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drivers
     * const drivers = await prisma.driver.findMany()
     * 
     * // Get first 10 Drivers
     * const drivers = await prisma.driver.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driverWithIdOnly = await prisma.driver.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DriverFindManyArgs>(args?: SelectSubset<T, DriverFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Driver.
     * @param {DriverCreateArgs} args - Arguments to create a Driver.
     * @example
     * // Create one Driver
     * const Driver = await prisma.driver.create({
     *   data: {
     *     // ... data to create a Driver
     *   }
     * })
     * 
     */
    create<T extends DriverCreateArgs>(args: SelectSubset<T, DriverCreateArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Drivers.
     * @param {DriverCreateManyArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const driver = await prisma.driver.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DriverCreateManyArgs>(args?: SelectSubset<T, DriverCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drivers and returns the data saved in the database.
     * @param {DriverCreateManyAndReturnArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const driver = await prisma.driver.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drivers and only return the `id`
     * const driverWithIdOnly = await prisma.driver.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DriverCreateManyAndReturnArgs>(args?: SelectSubset<T, DriverCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Driver.
     * @param {DriverDeleteArgs} args - Arguments to delete one Driver.
     * @example
     * // Delete one Driver
     * const Driver = await prisma.driver.delete({
     *   where: {
     *     // ... filter to delete one Driver
     *   }
     * })
     * 
     */
    delete<T extends DriverDeleteArgs>(args: SelectSubset<T, DriverDeleteArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Driver.
     * @param {DriverUpdateArgs} args - Arguments to update one Driver.
     * @example
     * // Update one Driver
     * const driver = await prisma.driver.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DriverUpdateArgs>(args: SelectSubset<T, DriverUpdateArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Drivers.
     * @param {DriverDeleteManyArgs} args - Arguments to filter Drivers to delete.
     * @example
     * // Delete a few Drivers
     * const { count } = await prisma.driver.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DriverDeleteManyArgs>(args?: SelectSubset<T, DriverDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DriverUpdateManyArgs>(args: SelectSubset<T, DriverUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers and returns the data updated in the database.
     * @param {DriverUpdateManyAndReturnArgs} args - Arguments to update many Drivers.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Drivers and only return the `id`
     * const driverWithIdOnly = await prisma.driver.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DriverUpdateManyAndReturnArgs>(args: SelectSubset<T, DriverUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Driver.
     * @param {DriverUpsertArgs} args - Arguments to update or create a Driver.
     * @example
     * // Update or create a Driver
     * const driver = await prisma.driver.upsert({
     *   create: {
     *     // ... data to create a Driver
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Driver we want to update
     *   }
     * })
     */
    upsert<T extends DriverUpsertArgs>(args: SelectSubset<T, DriverUpsertArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverCountArgs} args - Arguments to filter Drivers to count.
     * @example
     * // Count the number of Drivers
     * const count = await prisma.driver.count({
     *   where: {
     *     // ... the filter for the Drivers we want to count
     *   }
     * })
    **/
    count<T extends DriverCountArgs>(
      args?: Subset<T, DriverCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriverCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriverAggregateArgs>(args: Subset<T, DriverAggregateArgs>): Prisma.PrismaPromise<GetDriverAggregateType<T>>

    /**
     * Group by Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DriverGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriverGroupByArgs['orderBy'] }
        : { orderBy?: DriverGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DriverGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Driver model
   */
  readonly fields: DriverFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Driver.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DriverClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends Driver$vehicleArgs<ExtArgs> = {}>(args?: Subset<T, Driver$vehicleArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    trips<T extends Driver$tripsArgs<ExtArgs> = {}>(args?: Subset<T, Driver$tripsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    services<T extends Driver$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Driver$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    repairs<T extends Driver$repairsArgs<ExtArgs> = {}>(args?: Subset<T, Driver$repairsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    truckDriver<T extends Driver$truckDriverArgs<ExtArgs> = {}>(args?: Subset<T, Driver$truckDriverArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Driver model
   */
  interface DriverFieldRefs {
    readonly id: FieldRef<"Driver", 'String'>
    readonly name: FieldRef<"Driver", 'String'>
    readonly phone: FieldRef<"Driver", 'String'>
    readonly address: FieldRef<"Driver", 'String'>
    readonly profileImage: FieldRef<"Driver", 'String'>
    readonly licenseNo: FieldRef<"Driver", 'String'>
    readonly licenseExp: FieldRef<"Driver", 'DateTime'>
    readonly licenseImage: FieldRef<"Driver", 'String'>
    readonly accountName: FieldRef<"Driver", 'String'>
    readonly accountNumber: FieldRef<"Driver", 'String'>
    readonly bank: FieldRef<"Driver", 'String'>
    readonly guarantorForm: FieldRef<"Driver", 'String'>
    readonly fingerPrint: FieldRef<"Driver", 'String'>
    readonly notes: FieldRef<"Driver", 'String'>
    readonly createdAt: FieldRef<"Driver", 'DateTime'>
    readonly updatedAt: FieldRef<"Driver", 'DateTime'>
    readonly deletedAt: FieldRef<"Driver", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Driver findUnique
   */
  export type DriverFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findUniqueOrThrow
   */
  export type DriverFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findFirst
   */
  export type DriverFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     */
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver findFirstOrThrow
   */
  export type DriverFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     */
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver findMany
   */
  export type DriverFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Drivers to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver create
   */
  export type DriverCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * The data needed to create a Driver.
     */
    data: XOR<DriverCreateInput, DriverUncheckedCreateInput>
  }

  /**
   * Driver createMany
   */
  export type DriverCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Drivers.
     */
    data: DriverCreateManyInput | DriverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Driver createManyAndReturn
   */
  export type DriverCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The data used to create many Drivers.
     */
    data: DriverCreateManyInput | DriverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Driver update
   */
  export type DriverUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * The data needed to update a Driver.
     */
    data: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
    /**
     * Choose, which Driver to update.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver updateMany
   */
  export type DriverUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Drivers.
     */
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to update.
     */
    limit?: number
  }

  /**
   * Driver updateManyAndReturn
   */
  export type DriverUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The data used to update Drivers.
     */
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to update.
     */
    limit?: number
  }

  /**
   * Driver upsert
   */
  export type DriverUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * The filter to search for the Driver to update in case it exists.
     */
    where: DriverWhereUniqueInput
    /**
     * In case the Driver found by the `where` argument doesn't exist, create a new Driver with this data.
     */
    create: XOR<DriverCreateInput, DriverUncheckedCreateInput>
    /**
     * In case the Driver was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
  }

  /**
   * Driver delete
   */
  export type DriverDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter which Driver to delete.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver deleteMany
   */
  export type DriverDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drivers to delete
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to delete.
     */
    limit?: number
  }

  /**
   * Driver.vehicle
   */
  export type Driver$vehicleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
  }

  /**
   * Driver.trips
   */
  export type Driver$tripsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    where?: TripWhereInput
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    cursor?: TripWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * Driver.services
   */
  export type Driver$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Driver.repairs
   */
  export type Driver$repairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
    where?: RepairWhereInput
    orderBy?: RepairOrderByWithRelationInput | RepairOrderByWithRelationInput[]
    cursor?: RepairWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepairScalarFieldEnum | RepairScalarFieldEnum[]
  }

  /**
   * Driver.truckDriver
   */
  export type Driver$truckDriverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverInclude<ExtArgs> | null
    where?: TruckDriverWhereInput
    orderBy?: TruckDriverOrderByWithRelationInput | TruckDriverOrderByWithRelationInput[]
    cursor?: TruckDriverWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TruckDriverScalarFieldEnum | TruckDriverScalarFieldEnum[]
  }

  /**
   * Driver without action
   */
  export type DriverDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    year: number | null
    fuelEfficiencyKmPerUnit: number | null
    currentOdo: number | null
  }

  export type VehicleSumAggregateOutputType = {
    year: number | null
    fuelEfficiencyKmPerUnit: number | null
    currentOdo: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    vin: string | null
    plateNumber: string | null
    cap_no: string | null
    make: string | null
    vehicleImg: string | null
    model: string | null
    year: number | null
    fuelType: $Enums.FuelType | null
    fuelEfficiencyKmPerUnit: number | null
    driverId: string | null
    currentOdo: number | null
    createdAt: Date | null
    asssignDate: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    vin: string | null
    plateNumber: string | null
    cap_no: string | null
    make: string | null
    vehicleImg: string | null
    model: string | null
    year: number | null
    fuelType: $Enums.FuelType | null
    fuelEfficiencyKmPerUnit: number | null
    driverId: string | null
    currentOdo: number | null
    createdAt: Date | null
    asssignDate: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    vin: number
    plateNumber: number
    cap_no: number
    make: number
    vehicleImg: number
    model: number
    year: number
    fuelType: number
    fuelEfficiencyKmPerUnit: number
    driverId: number
    currentOdo: number
    createdAt: number
    asssignDate: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    year?: true
    fuelEfficiencyKmPerUnit?: true
    currentOdo?: true
  }

  export type VehicleSumAggregateInputType = {
    year?: true
    fuelEfficiencyKmPerUnit?: true
    currentOdo?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    vin?: true
    plateNumber?: true
    cap_no?: true
    make?: true
    vehicleImg?: true
    model?: true
    year?: true
    fuelType?: true
    fuelEfficiencyKmPerUnit?: true
    driverId?: true
    currentOdo?: true
    createdAt?: true
    asssignDate?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    vin?: true
    plateNumber?: true
    cap_no?: true
    make?: true
    vehicleImg?: true
    model?: true
    year?: true
    fuelType?: true
    fuelEfficiencyKmPerUnit?: true
    driverId?: true
    currentOdo?: true
    createdAt?: true
    asssignDate?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    vin?: true
    plateNumber?: true
    cap_no?: true
    make?: true
    vehicleImg?: true
    model?: true
    year?: true
    fuelType?: true
    fuelEfficiencyKmPerUnit?: true
    driverId?: true
    currentOdo?: true
    createdAt?: true
    asssignDate?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    vin: string | null
    plateNumber: string
    cap_no: string
    make: string | null
    vehicleImg: string | null
    model: string | null
    year: number | null
    fuelType: $Enums.FuelType
    fuelEfficiencyKmPerUnit: number | null
    driverId: string | null
    currentOdo: number | null
    createdAt: Date
    asssignDate: Date | null
    updatedAt: Date
    deletedAt: Date | null
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vin?: boolean
    plateNumber?: boolean
    cap_no?: boolean
    make?: boolean
    vehicleImg?: boolean
    model?: boolean
    year?: boolean
    fuelType?: boolean
    fuelEfficiencyKmPerUnit?: boolean
    driverId?: boolean
    currentOdo?: boolean
    createdAt?: boolean
    asssignDate?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    driver?: boolean | Vehicle$driverArgs<ExtArgs>
    trips?: boolean | Vehicle$tripsArgs<ExtArgs>
    truckDriver?: boolean | Vehicle$truckDriverArgs<ExtArgs>
    services?: boolean | Vehicle$servicesArgs<ExtArgs>
    repairs?: boolean | Vehicle$repairsArgs<ExtArgs>
    parts?: boolean | Vehicle$partsArgs<ExtArgs>
    tires?: boolean | Vehicle$tiresArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vin?: boolean
    plateNumber?: boolean
    cap_no?: boolean
    make?: boolean
    vehicleImg?: boolean
    model?: boolean
    year?: boolean
    fuelType?: boolean
    fuelEfficiencyKmPerUnit?: boolean
    driverId?: boolean
    currentOdo?: boolean
    createdAt?: boolean
    asssignDate?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    driver?: boolean | Vehicle$driverArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vin?: boolean
    plateNumber?: boolean
    cap_no?: boolean
    make?: boolean
    vehicleImg?: boolean
    model?: boolean
    year?: boolean
    fuelType?: boolean
    fuelEfficiencyKmPerUnit?: boolean
    driverId?: boolean
    currentOdo?: boolean
    createdAt?: boolean
    asssignDate?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    driver?: boolean | Vehicle$driverArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    vin?: boolean
    plateNumber?: boolean
    cap_no?: boolean
    make?: boolean
    vehicleImg?: boolean
    model?: boolean
    year?: boolean
    fuelType?: boolean
    fuelEfficiencyKmPerUnit?: boolean
    driverId?: boolean
    currentOdo?: boolean
    createdAt?: boolean
    asssignDate?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vin" | "plateNumber" | "cap_no" | "make" | "vehicleImg" | "model" | "year" | "fuelType" | "fuelEfficiencyKmPerUnit" | "driverId" | "currentOdo" | "createdAt" | "asssignDate" | "updatedAt" | "deletedAt", ExtArgs["result"]["vehicle"]>
  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | Vehicle$driverArgs<ExtArgs>
    trips?: boolean | Vehicle$tripsArgs<ExtArgs>
    truckDriver?: boolean | Vehicle$truckDriverArgs<ExtArgs>
    services?: boolean | Vehicle$servicesArgs<ExtArgs>
    repairs?: boolean | Vehicle$repairsArgs<ExtArgs>
    parts?: boolean | Vehicle$partsArgs<ExtArgs>
    tires?: boolean | Vehicle$tiresArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | Vehicle$driverArgs<ExtArgs>
  }
  export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | Vehicle$driverArgs<ExtArgs>
  }

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      driver: Prisma.$DriverPayload<ExtArgs> | null
      trips: Prisma.$TripPayload<ExtArgs>[]
      truckDriver: Prisma.$TruckDriverPayload<ExtArgs>[]
      services: Prisma.$ServicePayload<ExtArgs>[]
      repairs: Prisma.$RepairPayload<ExtArgs>[]
      parts: Prisma.$PartPayload<ExtArgs>[]
      tires: Prisma.$TirePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vin: string | null
      plateNumber: string
      cap_no: string
      make: string | null
      vehicleImg: string | null
      model: string | null
      year: number | null
      fuelType: $Enums.FuelType
      fuelEfficiencyKmPerUnit: number | null
      driverId: string | null
      currentOdo: number | null
      createdAt: Date
      asssignDate: Date | null
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driver<T extends Vehicle$driverArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$driverArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    trips<T extends Vehicle$tripsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$tripsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    truckDriver<T extends Vehicle$truckDriverArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$truckDriverArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    services<T extends Vehicle$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    repairs<T extends Vehicle$repairsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$repairsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parts<T extends Vehicle$partsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$partsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tires<T extends Vehicle$tiresArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$tiresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TirePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vehicle model
   */
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly vin: FieldRef<"Vehicle", 'String'>
    readonly plateNumber: FieldRef<"Vehicle", 'String'>
    readonly cap_no: FieldRef<"Vehicle", 'String'>
    readonly make: FieldRef<"Vehicle", 'String'>
    readonly vehicleImg: FieldRef<"Vehicle", 'String'>
    readonly model: FieldRef<"Vehicle", 'String'>
    readonly year: FieldRef<"Vehicle", 'Int'>
    readonly fuelType: FieldRef<"Vehicle", 'FuelType'>
    readonly fuelEfficiencyKmPerUnit: FieldRef<"Vehicle", 'Float'>
    readonly driverId: FieldRef<"Vehicle", 'String'>
    readonly currentOdo: FieldRef<"Vehicle", 'Int'>
    readonly createdAt: FieldRef<"Vehicle", 'DateTime'>
    readonly asssignDate: FieldRef<"Vehicle", 'DateTime'>
    readonly updatedAt: FieldRef<"Vehicle", 'DateTime'>
    readonly deletedAt: FieldRef<"Vehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle.driver
   */
  export type Vehicle$driverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    where?: DriverWhereInput
  }

  /**
   * Vehicle.trips
   */
  export type Vehicle$tripsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    where?: TripWhereInput
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    cursor?: TripWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * Vehicle.truckDriver
   */
  export type Vehicle$truckDriverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverInclude<ExtArgs> | null
    where?: TruckDriverWhereInput
    orderBy?: TruckDriverOrderByWithRelationInput | TruckDriverOrderByWithRelationInput[]
    cursor?: TruckDriverWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TruckDriverScalarFieldEnum | TruckDriverScalarFieldEnum[]
  }

  /**
   * Vehicle.services
   */
  export type Vehicle$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Vehicle.repairs
   */
  export type Vehicle$repairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
    where?: RepairWhereInput
    orderBy?: RepairOrderByWithRelationInput | RepairOrderByWithRelationInput[]
    cursor?: RepairWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepairScalarFieldEnum | RepairScalarFieldEnum[]
  }

  /**
   * Vehicle.parts
   */
  export type Vehicle$partsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    where?: PartWhereInput
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    cursor?: PartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Vehicle.tires
   */
  export type Vehicle$tiresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireInclude<ExtArgs> | null
    where?: TireWhereInput
    orderBy?: TireOrderByWithRelationInput | TireOrderByWithRelationInput[]
    cursor?: TireWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TireScalarFieldEnum | TireScalarFieldEnum[]
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model TruckDriver
   */

  export type AggregateTruckDriver = {
    _count: TruckDriverCountAggregateOutputType | null
    _min: TruckDriverMinAggregateOutputType | null
    _max: TruckDriverMaxAggregateOutputType | null
  }

  export type TruckDriverMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    driverId: string | null
    from: Date | null
    to: Date | null
    createdAt: Date | null
  }

  export type TruckDriverMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    driverId: string | null
    from: Date | null
    to: Date | null
    createdAt: Date | null
  }

  export type TruckDriverCountAggregateOutputType = {
    id: number
    vehicleId: number
    driverId: number
    from: number
    to: number
    createdAt: number
    _all: number
  }


  export type TruckDriverMinAggregateInputType = {
    id?: true
    vehicleId?: true
    driverId?: true
    from?: true
    to?: true
    createdAt?: true
  }

  export type TruckDriverMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    driverId?: true
    from?: true
    to?: true
    createdAt?: true
  }

  export type TruckDriverCountAggregateInputType = {
    id?: true
    vehicleId?: true
    driverId?: true
    from?: true
    to?: true
    createdAt?: true
    _all?: true
  }

  export type TruckDriverAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TruckDriver to aggregate.
     */
    where?: TruckDriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TruckDrivers to fetch.
     */
    orderBy?: TruckDriverOrderByWithRelationInput | TruckDriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TruckDriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TruckDrivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TruckDrivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TruckDrivers
    **/
    _count?: true | TruckDriverCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TruckDriverMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TruckDriverMaxAggregateInputType
  }

  export type GetTruckDriverAggregateType<T extends TruckDriverAggregateArgs> = {
        [P in keyof T & keyof AggregateTruckDriver]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTruckDriver[P]>
      : GetScalarType<T[P], AggregateTruckDriver[P]>
  }




  export type TruckDriverGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TruckDriverWhereInput
    orderBy?: TruckDriverOrderByWithAggregationInput | TruckDriverOrderByWithAggregationInput[]
    by: TruckDriverScalarFieldEnum[] | TruckDriverScalarFieldEnum
    having?: TruckDriverScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TruckDriverCountAggregateInputType | true
    _min?: TruckDriverMinAggregateInputType
    _max?: TruckDriverMaxAggregateInputType
  }

  export type TruckDriverGroupByOutputType = {
    id: string
    vehicleId: string
    driverId: string
    from: Date | null
    to: Date | null
    createdAt: Date
    _count: TruckDriverCountAggregateOutputType | null
    _min: TruckDriverMinAggregateOutputType | null
    _max: TruckDriverMaxAggregateOutputType | null
  }

  type GetTruckDriverGroupByPayload<T extends TruckDriverGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TruckDriverGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TruckDriverGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TruckDriverGroupByOutputType[P]>
            : GetScalarType<T[P], TruckDriverGroupByOutputType[P]>
        }
      >
    >


  export type TruckDriverSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    from?: boolean
    to?: boolean
    createdAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["truckDriver"]>

  export type TruckDriverSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    from?: boolean
    to?: boolean
    createdAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["truckDriver"]>

  export type TruckDriverSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    from?: boolean
    to?: boolean
    createdAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["truckDriver"]>

  export type TruckDriverSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    from?: boolean
    to?: boolean
    createdAt?: boolean
  }

  export type TruckDriverOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vehicleId" | "driverId" | "from" | "to" | "createdAt", ExtArgs["result"]["truckDriver"]>
  export type TruckDriverInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }
  export type TruckDriverIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }
  export type TruckDriverIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }

  export type $TruckDriverPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TruckDriver"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
      driver: Prisma.$DriverPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      driverId: string
      from: Date | null
      to: Date | null
      createdAt: Date
    }, ExtArgs["result"]["truckDriver"]>
    composites: {}
  }

  type TruckDriverGetPayload<S extends boolean | null | undefined | TruckDriverDefaultArgs> = $Result.GetResult<Prisma.$TruckDriverPayload, S>

  type TruckDriverCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TruckDriverFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TruckDriverCountAggregateInputType | true
    }

  export interface TruckDriverDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TruckDriver'], meta: { name: 'TruckDriver' } }
    /**
     * Find zero or one TruckDriver that matches the filter.
     * @param {TruckDriverFindUniqueArgs} args - Arguments to find a TruckDriver
     * @example
     * // Get one TruckDriver
     * const truckDriver = await prisma.truckDriver.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TruckDriverFindUniqueArgs>(args: SelectSubset<T, TruckDriverFindUniqueArgs<ExtArgs>>): Prisma__TruckDriverClient<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TruckDriver that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TruckDriverFindUniqueOrThrowArgs} args - Arguments to find a TruckDriver
     * @example
     * // Get one TruckDriver
     * const truckDriver = await prisma.truckDriver.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TruckDriverFindUniqueOrThrowArgs>(args: SelectSubset<T, TruckDriverFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TruckDriverClient<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TruckDriver that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TruckDriverFindFirstArgs} args - Arguments to find a TruckDriver
     * @example
     * // Get one TruckDriver
     * const truckDriver = await prisma.truckDriver.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TruckDriverFindFirstArgs>(args?: SelectSubset<T, TruckDriverFindFirstArgs<ExtArgs>>): Prisma__TruckDriverClient<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TruckDriver that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TruckDriverFindFirstOrThrowArgs} args - Arguments to find a TruckDriver
     * @example
     * // Get one TruckDriver
     * const truckDriver = await prisma.truckDriver.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TruckDriverFindFirstOrThrowArgs>(args?: SelectSubset<T, TruckDriverFindFirstOrThrowArgs<ExtArgs>>): Prisma__TruckDriverClient<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TruckDrivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TruckDriverFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TruckDrivers
     * const truckDrivers = await prisma.truckDriver.findMany()
     * 
     * // Get first 10 TruckDrivers
     * const truckDrivers = await prisma.truckDriver.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const truckDriverWithIdOnly = await prisma.truckDriver.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TruckDriverFindManyArgs>(args?: SelectSubset<T, TruckDriverFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TruckDriver.
     * @param {TruckDriverCreateArgs} args - Arguments to create a TruckDriver.
     * @example
     * // Create one TruckDriver
     * const TruckDriver = await prisma.truckDriver.create({
     *   data: {
     *     // ... data to create a TruckDriver
     *   }
     * })
     * 
     */
    create<T extends TruckDriverCreateArgs>(args: SelectSubset<T, TruckDriverCreateArgs<ExtArgs>>): Prisma__TruckDriverClient<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TruckDrivers.
     * @param {TruckDriverCreateManyArgs} args - Arguments to create many TruckDrivers.
     * @example
     * // Create many TruckDrivers
     * const truckDriver = await prisma.truckDriver.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TruckDriverCreateManyArgs>(args?: SelectSubset<T, TruckDriverCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TruckDrivers and returns the data saved in the database.
     * @param {TruckDriverCreateManyAndReturnArgs} args - Arguments to create many TruckDrivers.
     * @example
     * // Create many TruckDrivers
     * const truckDriver = await prisma.truckDriver.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TruckDrivers and only return the `id`
     * const truckDriverWithIdOnly = await prisma.truckDriver.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TruckDriverCreateManyAndReturnArgs>(args?: SelectSubset<T, TruckDriverCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TruckDriver.
     * @param {TruckDriverDeleteArgs} args - Arguments to delete one TruckDriver.
     * @example
     * // Delete one TruckDriver
     * const TruckDriver = await prisma.truckDriver.delete({
     *   where: {
     *     // ... filter to delete one TruckDriver
     *   }
     * })
     * 
     */
    delete<T extends TruckDriverDeleteArgs>(args: SelectSubset<T, TruckDriverDeleteArgs<ExtArgs>>): Prisma__TruckDriverClient<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TruckDriver.
     * @param {TruckDriverUpdateArgs} args - Arguments to update one TruckDriver.
     * @example
     * // Update one TruckDriver
     * const truckDriver = await prisma.truckDriver.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TruckDriverUpdateArgs>(args: SelectSubset<T, TruckDriverUpdateArgs<ExtArgs>>): Prisma__TruckDriverClient<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TruckDrivers.
     * @param {TruckDriverDeleteManyArgs} args - Arguments to filter TruckDrivers to delete.
     * @example
     * // Delete a few TruckDrivers
     * const { count } = await prisma.truckDriver.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TruckDriverDeleteManyArgs>(args?: SelectSubset<T, TruckDriverDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TruckDrivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TruckDriverUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TruckDrivers
     * const truckDriver = await prisma.truckDriver.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TruckDriverUpdateManyArgs>(args: SelectSubset<T, TruckDriverUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TruckDrivers and returns the data updated in the database.
     * @param {TruckDriverUpdateManyAndReturnArgs} args - Arguments to update many TruckDrivers.
     * @example
     * // Update many TruckDrivers
     * const truckDriver = await prisma.truckDriver.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TruckDrivers and only return the `id`
     * const truckDriverWithIdOnly = await prisma.truckDriver.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TruckDriverUpdateManyAndReturnArgs>(args: SelectSubset<T, TruckDriverUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TruckDriver.
     * @param {TruckDriverUpsertArgs} args - Arguments to update or create a TruckDriver.
     * @example
     * // Update or create a TruckDriver
     * const truckDriver = await prisma.truckDriver.upsert({
     *   create: {
     *     // ... data to create a TruckDriver
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TruckDriver we want to update
     *   }
     * })
     */
    upsert<T extends TruckDriverUpsertArgs>(args: SelectSubset<T, TruckDriverUpsertArgs<ExtArgs>>): Prisma__TruckDriverClient<$Result.GetResult<Prisma.$TruckDriverPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TruckDrivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TruckDriverCountArgs} args - Arguments to filter TruckDrivers to count.
     * @example
     * // Count the number of TruckDrivers
     * const count = await prisma.truckDriver.count({
     *   where: {
     *     // ... the filter for the TruckDrivers we want to count
     *   }
     * })
    **/
    count<T extends TruckDriverCountArgs>(
      args?: Subset<T, TruckDriverCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TruckDriverCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TruckDriver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TruckDriverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TruckDriverAggregateArgs>(args: Subset<T, TruckDriverAggregateArgs>): Prisma.PrismaPromise<GetTruckDriverAggregateType<T>>

    /**
     * Group by TruckDriver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TruckDriverGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TruckDriverGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TruckDriverGroupByArgs['orderBy'] }
        : { orderBy?: TruckDriverGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TruckDriverGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTruckDriverGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TruckDriver model
   */
  readonly fields: TruckDriverFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TruckDriver.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TruckDriverClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    driver<T extends DriverDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DriverDefaultArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TruckDriver model
   */
  interface TruckDriverFieldRefs {
    readonly id: FieldRef<"TruckDriver", 'String'>
    readonly vehicleId: FieldRef<"TruckDriver", 'String'>
    readonly driverId: FieldRef<"TruckDriver", 'String'>
    readonly from: FieldRef<"TruckDriver", 'DateTime'>
    readonly to: FieldRef<"TruckDriver", 'DateTime'>
    readonly createdAt: FieldRef<"TruckDriver", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TruckDriver findUnique
   */
  export type TruckDriverFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverInclude<ExtArgs> | null
    /**
     * Filter, which TruckDriver to fetch.
     */
    where: TruckDriverWhereUniqueInput
  }

  /**
   * TruckDriver findUniqueOrThrow
   */
  export type TruckDriverFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverInclude<ExtArgs> | null
    /**
     * Filter, which TruckDriver to fetch.
     */
    where: TruckDriverWhereUniqueInput
  }

  /**
   * TruckDriver findFirst
   */
  export type TruckDriverFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverInclude<ExtArgs> | null
    /**
     * Filter, which TruckDriver to fetch.
     */
    where?: TruckDriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TruckDrivers to fetch.
     */
    orderBy?: TruckDriverOrderByWithRelationInput | TruckDriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TruckDrivers.
     */
    cursor?: TruckDriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TruckDrivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TruckDrivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TruckDrivers.
     */
    distinct?: TruckDriverScalarFieldEnum | TruckDriverScalarFieldEnum[]
  }

  /**
   * TruckDriver findFirstOrThrow
   */
  export type TruckDriverFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverInclude<ExtArgs> | null
    /**
     * Filter, which TruckDriver to fetch.
     */
    where?: TruckDriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TruckDrivers to fetch.
     */
    orderBy?: TruckDriverOrderByWithRelationInput | TruckDriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TruckDrivers.
     */
    cursor?: TruckDriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TruckDrivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TruckDrivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TruckDrivers.
     */
    distinct?: TruckDriverScalarFieldEnum | TruckDriverScalarFieldEnum[]
  }

  /**
   * TruckDriver findMany
   */
  export type TruckDriverFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverInclude<ExtArgs> | null
    /**
     * Filter, which TruckDrivers to fetch.
     */
    where?: TruckDriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TruckDrivers to fetch.
     */
    orderBy?: TruckDriverOrderByWithRelationInput | TruckDriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TruckDrivers.
     */
    cursor?: TruckDriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TruckDrivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TruckDrivers.
     */
    skip?: number
    distinct?: TruckDriverScalarFieldEnum | TruckDriverScalarFieldEnum[]
  }

  /**
   * TruckDriver create
   */
  export type TruckDriverCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverInclude<ExtArgs> | null
    /**
     * The data needed to create a TruckDriver.
     */
    data: XOR<TruckDriverCreateInput, TruckDriverUncheckedCreateInput>
  }

  /**
   * TruckDriver createMany
   */
  export type TruckDriverCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TruckDrivers.
     */
    data: TruckDriverCreateManyInput | TruckDriverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TruckDriver createManyAndReturn
   */
  export type TruckDriverCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * The data used to create many TruckDrivers.
     */
    data: TruckDriverCreateManyInput | TruckDriverCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TruckDriver update
   */
  export type TruckDriverUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverInclude<ExtArgs> | null
    /**
     * The data needed to update a TruckDriver.
     */
    data: XOR<TruckDriverUpdateInput, TruckDriverUncheckedUpdateInput>
    /**
     * Choose, which TruckDriver to update.
     */
    where: TruckDriverWhereUniqueInput
  }

  /**
   * TruckDriver updateMany
   */
  export type TruckDriverUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TruckDrivers.
     */
    data: XOR<TruckDriverUpdateManyMutationInput, TruckDriverUncheckedUpdateManyInput>
    /**
     * Filter which TruckDrivers to update
     */
    where?: TruckDriverWhereInput
    /**
     * Limit how many TruckDrivers to update.
     */
    limit?: number
  }

  /**
   * TruckDriver updateManyAndReturn
   */
  export type TruckDriverUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * The data used to update TruckDrivers.
     */
    data: XOR<TruckDriverUpdateManyMutationInput, TruckDriverUncheckedUpdateManyInput>
    /**
     * Filter which TruckDrivers to update
     */
    where?: TruckDriverWhereInput
    /**
     * Limit how many TruckDrivers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TruckDriver upsert
   */
  export type TruckDriverUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverInclude<ExtArgs> | null
    /**
     * The filter to search for the TruckDriver to update in case it exists.
     */
    where: TruckDriverWhereUniqueInput
    /**
     * In case the TruckDriver found by the `where` argument doesn't exist, create a new TruckDriver with this data.
     */
    create: XOR<TruckDriverCreateInput, TruckDriverUncheckedCreateInput>
    /**
     * In case the TruckDriver was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TruckDriverUpdateInput, TruckDriverUncheckedUpdateInput>
  }

  /**
   * TruckDriver delete
   */
  export type TruckDriverDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverInclude<ExtArgs> | null
    /**
     * Filter which TruckDriver to delete.
     */
    where: TruckDriverWhereUniqueInput
  }

  /**
   * TruckDriver deleteMany
   */
  export type TruckDriverDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TruckDrivers to delete
     */
    where?: TruckDriverWhereInput
    /**
     * Limit how many TruckDrivers to delete.
     */
    limit?: number
  }

  /**
   * TruckDriver without action
   */
  export type TruckDriverDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckDriver
     */
    select?: TruckDriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TruckDriver
     */
    omit?: TruckDriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TruckDriverInclude<ExtArgs> | null
  }


  /**
   * Model Trip
   */

  export type AggregateTrip = {
    _count: TripCountAggregateOutputType | null
    _avg: TripAvgAggregateOutputType | null
    _sum: TripSumAggregateOutputType | null
    _min: TripMinAggregateOutputType | null
    _max: TripMaxAggregateOutputType | null
  }

  export type TripAvgAggregateOutputType = {
    totaldistanceKm: number | null
    odoStart: number | null
    odoEnd: number | null
    totalFuelCost: number | null
    totalCO2Kg: number | null
    costPerKm: number | null
  }

  export type TripSumAggregateOutputType = {
    totaldistanceKm: number | null
    odoStart: number | null
    odoEnd: number | null
    totalFuelCost: number | null
    totalCO2Kg: number | null
    costPerKm: number | null
  }

  export type TripMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    driverId: string | null
    loadingPlant: string | null
    waybill_no: string | null
    atcNo: string | null
    company: string | null
    destination: string | null
    despatchDate: Date | null
    uploadDate: Date | null
    totaldistanceKm: number | null
    odoStart: number | null
    odoEnd: number | null
    totalFuelCost: number | null
    totalCO2Kg: number | null
    costPerKm: number | null
    status: $Enums.TripStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TripMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    driverId: string | null
    loadingPlant: string | null
    waybill_no: string | null
    atcNo: string | null
    company: string | null
    destination: string | null
    despatchDate: Date | null
    uploadDate: Date | null
    totaldistanceKm: number | null
    odoStart: number | null
    odoEnd: number | null
    totalFuelCost: number | null
    totalCO2Kg: number | null
    costPerKm: number | null
    status: $Enums.TripStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TripCountAggregateOutputType = {
    id: number
    vehicleId: number
    driverId: number
    loadingPlant: number
    waybill_no: number
    atcNo: number
    company: number
    destination: number
    despatchDate: number
    uploadDate: number
    totaldistanceKm: number
    odoStart: number
    odoEnd: number
    totalFuelCost: number
    totalCO2Kg: number
    costPerKm: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TripAvgAggregateInputType = {
    totaldistanceKm?: true
    odoStart?: true
    odoEnd?: true
    totalFuelCost?: true
    totalCO2Kg?: true
    costPerKm?: true
  }

  export type TripSumAggregateInputType = {
    totaldistanceKm?: true
    odoStart?: true
    odoEnd?: true
    totalFuelCost?: true
    totalCO2Kg?: true
    costPerKm?: true
  }

  export type TripMinAggregateInputType = {
    id?: true
    vehicleId?: true
    driverId?: true
    loadingPlant?: true
    waybill_no?: true
    atcNo?: true
    company?: true
    destination?: true
    despatchDate?: true
    uploadDate?: true
    totaldistanceKm?: true
    odoStart?: true
    odoEnd?: true
    totalFuelCost?: true
    totalCO2Kg?: true
    costPerKm?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TripMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    driverId?: true
    loadingPlant?: true
    waybill_no?: true
    atcNo?: true
    company?: true
    destination?: true
    despatchDate?: true
    uploadDate?: true
    totaldistanceKm?: true
    odoStart?: true
    odoEnd?: true
    totalFuelCost?: true
    totalCO2Kg?: true
    costPerKm?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TripCountAggregateInputType = {
    id?: true
    vehicleId?: true
    driverId?: true
    loadingPlant?: true
    waybill_no?: true
    atcNo?: true
    company?: true
    destination?: true
    despatchDate?: true
    uploadDate?: true
    totaldistanceKm?: true
    odoStart?: true
    odoEnd?: true
    totalFuelCost?: true
    totalCO2Kg?: true
    costPerKm?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TripAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trip to aggregate.
     */
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     */
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trips
    **/
    _count?: true | TripCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TripAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TripSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TripMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TripMaxAggregateInputType
  }

  export type GetTripAggregateType<T extends TripAggregateArgs> = {
        [P in keyof T & keyof AggregateTrip]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrip[P]>
      : GetScalarType<T[P], AggregateTrip[P]>
  }




  export type TripGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TripWhereInput
    orderBy?: TripOrderByWithAggregationInput | TripOrderByWithAggregationInput[]
    by: TripScalarFieldEnum[] | TripScalarFieldEnum
    having?: TripScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TripCountAggregateInputType | true
    _avg?: TripAvgAggregateInputType
    _sum?: TripSumAggregateInputType
    _min?: TripMinAggregateInputType
    _max?: TripMaxAggregateInputType
  }

  export type TripGroupByOutputType = {
    id: string
    vehicleId: string
    driverId: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company: string | null
    destination: string
    despatchDate: Date
    uploadDate: Date
    totaldistanceKm: number | null
    odoStart: number | null
    odoEnd: number | null
    totalFuelCost: number | null
    totalCO2Kg: number | null
    costPerKm: number | null
    status: $Enums.TripStatus
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: TripCountAggregateOutputType | null
    _avg: TripAvgAggregateOutputType | null
    _sum: TripSumAggregateOutputType | null
    _min: TripMinAggregateOutputType | null
    _max: TripMaxAggregateOutputType | null
  }

  type GetTripGroupByPayload<T extends TripGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TripGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TripGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TripGroupByOutputType[P]>
            : GetScalarType<T[P], TripGroupByOutputType[P]>
        }
      >
    >


  export type TripSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    loadingPlant?: boolean
    waybill_no?: boolean
    atcNo?: boolean
    company?: boolean
    destination?: boolean
    despatchDate?: boolean
    uploadDate?: boolean
    totaldistanceKm?: boolean
    odoStart?: boolean
    odoEnd?: boolean
    totalFuelCost?: boolean
    totalCO2Kg?: boolean
    costPerKm?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | Trip$customerArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    fuels?: boolean | Trip$fuelsArgs<ExtArgs>
    _count?: boolean | TripCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trip"]>

  export type TripSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    loadingPlant?: boolean
    waybill_no?: boolean
    atcNo?: boolean
    company?: boolean
    destination?: boolean
    despatchDate?: boolean
    uploadDate?: boolean
    totaldistanceKm?: boolean
    odoStart?: boolean
    odoEnd?: boolean
    totalFuelCost?: boolean
    totalCO2Kg?: boolean
    costPerKm?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trip"]>

  export type TripSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    loadingPlant?: boolean
    waybill_no?: boolean
    atcNo?: boolean
    company?: boolean
    destination?: boolean
    despatchDate?: boolean
    uploadDate?: boolean
    totaldistanceKm?: boolean
    odoStart?: boolean
    odoEnd?: boolean
    totalFuelCost?: boolean
    totalCO2Kg?: boolean
    costPerKm?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trip"]>

  export type TripSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    loadingPlant?: boolean
    waybill_no?: boolean
    atcNo?: boolean
    company?: boolean
    destination?: boolean
    despatchDate?: boolean
    uploadDate?: boolean
    totaldistanceKm?: boolean
    odoStart?: boolean
    odoEnd?: boolean
    totalFuelCost?: boolean
    totalCO2Kg?: boolean
    costPerKm?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TripOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vehicleId" | "driverId" | "loadingPlant" | "waybill_no" | "atcNo" | "company" | "destination" | "despatchDate" | "uploadDate" | "totaldistanceKm" | "odoStart" | "odoEnd" | "totalFuelCost" | "totalCO2Kg" | "costPerKm" | "status" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["trip"]>
  export type TripInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Trip$customerArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    fuels?: boolean | Trip$fuelsArgs<ExtArgs>
    _count?: boolean | TripCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TripIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }
  export type TripIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }

  export type $TripPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trip"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>[]
      vehicle: Prisma.$VehiclePayload<ExtArgs>
      driver: Prisma.$DriverPayload<ExtArgs>
      fuels: Prisma.$FuelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      driverId: string
      loadingPlant: string
      waybill_no: string
      atcNo: string
      company: string | null
      destination: string
      despatchDate: Date
      uploadDate: Date
      totaldistanceKm: number | null
      odoStart: number | null
      odoEnd: number | null
      totalFuelCost: number | null
      totalCO2Kg: number | null
      costPerKm: number | null
      status: $Enums.TripStatus
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trip"]>
    composites: {}
  }

  type TripGetPayload<S extends boolean | null | undefined | TripDefaultArgs> = $Result.GetResult<Prisma.$TripPayload, S>

  type TripCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TripFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TripCountAggregateInputType | true
    }

  export interface TripDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trip'], meta: { name: 'Trip' } }
    /**
     * Find zero or one Trip that matches the filter.
     * @param {TripFindUniqueArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TripFindUniqueArgs>(args: SelectSubset<T, TripFindUniqueArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trip that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TripFindUniqueOrThrowArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TripFindUniqueOrThrowArgs>(args: SelectSubset<T, TripFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trip that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindFirstArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TripFindFirstArgs>(args?: SelectSubset<T, TripFindFirstArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trip that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindFirstOrThrowArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TripFindFirstOrThrowArgs>(args?: SelectSubset<T, TripFindFirstOrThrowArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trips
     * const trips = await prisma.trip.findMany()
     * 
     * // Get first 10 Trips
     * const trips = await prisma.trip.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tripWithIdOnly = await prisma.trip.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TripFindManyArgs>(args?: SelectSubset<T, TripFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trip.
     * @param {TripCreateArgs} args - Arguments to create a Trip.
     * @example
     * // Create one Trip
     * const Trip = await prisma.trip.create({
     *   data: {
     *     // ... data to create a Trip
     *   }
     * })
     * 
     */
    create<T extends TripCreateArgs>(args: SelectSubset<T, TripCreateArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trips.
     * @param {TripCreateManyArgs} args - Arguments to create many Trips.
     * @example
     * // Create many Trips
     * const trip = await prisma.trip.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TripCreateManyArgs>(args?: SelectSubset<T, TripCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trips and returns the data saved in the database.
     * @param {TripCreateManyAndReturnArgs} args - Arguments to create many Trips.
     * @example
     * // Create many Trips
     * const trip = await prisma.trip.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trips and only return the `id`
     * const tripWithIdOnly = await prisma.trip.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TripCreateManyAndReturnArgs>(args?: SelectSubset<T, TripCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trip.
     * @param {TripDeleteArgs} args - Arguments to delete one Trip.
     * @example
     * // Delete one Trip
     * const Trip = await prisma.trip.delete({
     *   where: {
     *     // ... filter to delete one Trip
     *   }
     * })
     * 
     */
    delete<T extends TripDeleteArgs>(args: SelectSubset<T, TripDeleteArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trip.
     * @param {TripUpdateArgs} args - Arguments to update one Trip.
     * @example
     * // Update one Trip
     * const trip = await prisma.trip.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TripUpdateArgs>(args: SelectSubset<T, TripUpdateArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trips.
     * @param {TripDeleteManyArgs} args - Arguments to filter Trips to delete.
     * @example
     * // Delete a few Trips
     * const { count } = await prisma.trip.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TripDeleteManyArgs>(args?: SelectSubset<T, TripDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trips
     * const trip = await prisma.trip.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TripUpdateManyArgs>(args: SelectSubset<T, TripUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trips and returns the data updated in the database.
     * @param {TripUpdateManyAndReturnArgs} args - Arguments to update many Trips.
     * @example
     * // Update many Trips
     * const trip = await prisma.trip.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trips and only return the `id`
     * const tripWithIdOnly = await prisma.trip.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TripUpdateManyAndReturnArgs>(args: SelectSubset<T, TripUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trip.
     * @param {TripUpsertArgs} args - Arguments to update or create a Trip.
     * @example
     * // Update or create a Trip
     * const trip = await prisma.trip.upsert({
     *   create: {
     *     // ... data to create a Trip
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trip we want to update
     *   }
     * })
     */
    upsert<T extends TripUpsertArgs>(args: SelectSubset<T, TripUpsertArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripCountArgs} args - Arguments to filter Trips to count.
     * @example
     * // Count the number of Trips
     * const count = await prisma.trip.count({
     *   where: {
     *     // ... the filter for the Trips we want to count
     *   }
     * })
    **/
    count<T extends TripCountArgs>(
      args?: Subset<T, TripCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TripCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TripAggregateArgs>(args: Subset<T, TripAggregateArgs>): Prisma.PrismaPromise<GetTripAggregateType<T>>

    /**
     * Group by Trip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TripGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TripGroupByArgs['orderBy'] }
        : { orderBy?: TripGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TripGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTripGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trip model
   */
  readonly fields: TripFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trip.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TripClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends Trip$customerArgs<ExtArgs> = {}>(args?: Subset<T, Trip$customerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    driver<T extends DriverDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DriverDefaultArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fuels<T extends Trip$fuelsArgs<ExtArgs> = {}>(args?: Subset<T, Trip$fuelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FuelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trip model
   */
  interface TripFieldRefs {
    readonly id: FieldRef<"Trip", 'String'>
    readonly vehicleId: FieldRef<"Trip", 'String'>
    readonly driverId: FieldRef<"Trip", 'String'>
    readonly loadingPlant: FieldRef<"Trip", 'String'>
    readonly waybill_no: FieldRef<"Trip", 'String'>
    readonly atcNo: FieldRef<"Trip", 'String'>
    readonly company: FieldRef<"Trip", 'String'>
    readonly destination: FieldRef<"Trip", 'String'>
    readonly despatchDate: FieldRef<"Trip", 'DateTime'>
    readonly uploadDate: FieldRef<"Trip", 'DateTime'>
    readonly totaldistanceKm: FieldRef<"Trip", 'Float'>
    readonly odoStart: FieldRef<"Trip", 'Int'>
    readonly odoEnd: FieldRef<"Trip", 'Int'>
    readonly totalFuelCost: FieldRef<"Trip", 'Float'>
    readonly totalCO2Kg: FieldRef<"Trip", 'Float'>
    readonly costPerKm: FieldRef<"Trip", 'Float'>
    readonly status: FieldRef<"Trip", 'TripStatus'>
    readonly notes: FieldRef<"Trip", 'String'>
    readonly createdAt: FieldRef<"Trip", 'DateTime'>
    readonly updatedAt: FieldRef<"Trip", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trip findUnique
   */
  export type TripFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trip to fetch.
     */
    where: TripWhereUniqueInput
  }

  /**
   * Trip findUniqueOrThrow
   */
  export type TripFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trip to fetch.
     */
    where: TripWhereUniqueInput
  }

  /**
   * Trip findFirst
   */
  export type TripFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trip to fetch.
     */
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     */
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trips.
     */
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trips.
     */
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * Trip findFirstOrThrow
   */
  export type TripFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trip to fetch.
     */
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     */
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trips.
     */
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trips.
     */
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * Trip findMany
   */
  export type TripFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trips to fetch.
     */
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     */
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trips.
     */
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     */
    skip?: number
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * Trip create
   */
  export type TripCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * The data needed to create a Trip.
     */
    data: XOR<TripCreateInput, TripUncheckedCreateInput>
  }

  /**
   * Trip createMany
   */
  export type TripCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trips.
     */
    data: TripCreateManyInput | TripCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trip createManyAndReturn
   */
  export type TripCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * The data used to create many Trips.
     */
    data: TripCreateManyInput | TripCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trip update
   */
  export type TripUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * The data needed to update a Trip.
     */
    data: XOR<TripUpdateInput, TripUncheckedUpdateInput>
    /**
     * Choose, which Trip to update.
     */
    where: TripWhereUniqueInput
  }

  /**
   * Trip updateMany
   */
  export type TripUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trips.
     */
    data: XOR<TripUpdateManyMutationInput, TripUncheckedUpdateManyInput>
    /**
     * Filter which Trips to update
     */
    where?: TripWhereInput
    /**
     * Limit how many Trips to update.
     */
    limit?: number
  }

  /**
   * Trip updateManyAndReturn
   */
  export type TripUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * The data used to update Trips.
     */
    data: XOR<TripUpdateManyMutationInput, TripUncheckedUpdateManyInput>
    /**
     * Filter which Trips to update
     */
    where?: TripWhereInput
    /**
     * Limit how many Trips to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trip upsert
   */
  export type TripUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * The filter to search for the Trip to update in case it exists.
     */
    where: TripWhereUniqueInput
    /**
     * In case the Trip found by the `where` argument doesn't exist, create a new Trip with this data.
     */
    create: XOR<TripCreateInput, TripUncheckedCreateInput>
    /**
     * In case the Trip was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TripUpdateInput, TripUncheckedUpdateInput>
  }

  /**
   * Trip delete
   */
  export type TripDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter which Trip to delete.
     */
    where: TripWhereUniqueInput
  }

  /**
   * Trip deleteMany
   */
  export type TripDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trips to delete
     */
    where?: TripWhereInput
    /**
     * Limit how many Trips to delete.
     */
    limit?: number
  }

  /**
   * Trip.customer
   */
  export type Trip$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    cursor?: CustomerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Trip.fuels
   */
  export type Trip$fuelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInclude<ExtArgs> | null
    where?: FuelWhereInput
    orderBy?: FuelOrderByWithRelationInput | FuelOrderByWithRelationInput[]
    cursor?: FuelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FuelScalarFieldEnum | FuelScalarFieldEnum[]
  }

  /**
   * Trip without action
   */
  export type TripDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    noOfBags: number | null
  }

  export type CustomerSumAggregateOutputType = {
    noOfBags: number | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    customerName: string | null
    tripId: string | null
    company: string | null
    noOfBags: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    customerName: string | null
    tripId: string | null
    company: string | null
    noOfBags: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    customerName: number
    tripId: number
    company: number
    noOfBags: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    noOfBags?: true
  }

  export type CustomerSumAggregateInputType = {
    noOfBags?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    customerName?: true
    tripId?: true
    company?: true
    noOfBags?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    customerName?: true
    tripId?: true
    company?: true
    noOfBags?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    customerName?: true
    tripId?: true
    company?: true
    noOfBags?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    customerName: string
    tripId: string
    company: string
    noOfBags: number | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    tripId?: boolean
    company?: boolean
    noOfBags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    tripId?: boolean
    company?: boolean
    noOfBags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    tripId?: boolean
    company?: boolean
    noOfBags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    customerName?: boolean
    tripId?: boolean
    company?: boolean
    noOfBags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerName" | "tripId" | "company" | "noOfBags" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      trip: Prisma.$TripPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerName: string
      tripId: string
      company: string
      noOfBags: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trip<T extends TripDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TripDefaultArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly customerName: FieldRef<"Customer", 'String'>
    readonly tripId: FieldRef<"Customer", 'String'>
    readonly company: FieldRef<"Customer", 'String'>
    readonly noOfBags: FieldRef<"Customer", 'Int'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Fuel
   */

  export type AggregateFuel = {
    _count: FuelCountAggregateOutputType | null
    _avg: FuelAvgAggregateOutputType | null
    _sum: FuelSumAggregateOutputType | null
    _min: FuelMinAggregateOutputType | null
    _max: FuelMaxAggregateOutputType | null
  }

  export type FuelAvgAggregateOutputType = {
    qtyGiven: number | null
    unitPrice: number | null
    fuelCost: number | null
    distanceKm: number | null
    estimatedCO2: number | null
    dieselEquivalentL: number | null
  }

  export type FuelSumAggregateOutputType = {
    qtyGiven: number | null
    unitPrice: number | null
    fuelCost: number | null
    distanceKm: number | null
    estimatedCO2: number | null
    dieselEquivalentL: number | null
  }

  export type FuelMinAggregateOutputType = {
    id: string | null
    type: $Enums.FuelType | null
    tripId: string | null
    qtyGiven: number | null
    unit: string | null
    unitPrice: number | null
    fuelCost: number | null
    distanceKm: number | null
    estimatedCO2: number | null
    dieselEquivalentL: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FuelMaxAggregateOutputType = {
    id: string | null
    type: $Enums.FuelType | null
    tripId: string | null
    qtyGiven: number | null
    unit: string | null
    unitPrice: number | null
    fuelCost: number | null
    distanceKm: number | null
    estimatedCO2: number | null
    dieselEquivalentL: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FuelCountAggregateOutputType = {
    id: number
    type: number
    tripId: number
    qtyGiven: number
    unit: number
    unitPrice: number
    fuelCost: number
    distanceKm: number
    estimatedCO2: number
    dieselEquivalentL: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FuelAvgAggregateInputType = {
    qtyGiven?: true
    unitPrice?: true
    fuelCost?: true
    distanceKm?: true
    estimatedCO2?: true
    dieselEquivalentL?: true
  }

  export type FuelSumAggregateInputType = {
    qtyGiven?: true
    unitPrice?: true
    fuelCost?: true
    distanceKm?: true
    estimatedCO2?: true
    dieselEquivalentL?: true
  }

  export type FuelMinAggregateInputType = {
    id?: true
    type?: true
    tripId?: true
    qtyGiven?: true
    unit?: true
    unitPrice?: true
    fuelCost?: true
    distanceKm?: true
    estimatedCO2?: true
    dieselEquivalentL?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FuelMaxAggregateInputType = {
    id?: true
    type?: true
    tripId?: true
    qtyGiven?: true
    unit?: true
    unitPrice?: true
    fuelCost?: true
    distanceKm?: true
    estimatedCO2?: true
    dieselEquivalentL?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FuelCountAggregateInputType = {
    id?: true
    type?: true
    tripId?: true
    qtyGiven?: true
    unit?: true
    unitPrice?: true
    fuelCost?: true
    distanceKm?: true
    estimatedCO2?: true
    dieselEquivalentL?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FuelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fuel to aggregate.
     */
    where?: FuelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fuels to fetch.
     */
    orderBy?: FuelOrderByWithRelationInput | FuelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FuelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fuels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fuels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fuels
    **/
    _count?: true | FuelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FuelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FuelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FuelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FuelMaxAggregateInputType
  }

  export type GetFuelAggregateType<T extends FuelAggregateArgs> = {
        [P in keyof T & keyof AggregateFuel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFuel[P]>
      : GetScalarType<T[P], AggregateFuel[P]>
  }




  export type FuelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FuelWhereInput
    orderBy?: FuelOrderByWithAggregationInput | FuelOrderByWithAggregationInput[]
    by: FuelScalarFieldEnum[] | FuelScalarFieldEnum
    having?: FuelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FuelCountAggregateInputType | true
    _avg?: FuelAvgAggregateInputType
    _sum?: FuelSumAggregateInputType
    _min?: FuelMinAggregateInputType
    _max?: FuelMaxAggregateInputType
  }

  export type FuelGroupByOutputType = {
    id: string
    type: $Enums.FuelType
    tripId: string
    qtyGiven: number
    unit: string
    unitPrice: number | null
    fuelCost: number | null
    distanceKm: number | null
    estimatedCO2: number | null
    dieselEquivalentL: number | null
    createdAt: Date
    updatedAt: Date
    _count: FuelCountAggregateOutputType | null
    _avg: FuelAvgAggregateOutputType | null
    _sum: FuelSumAggregateOutputType | null
    _min: FuelMinAggregateOutputType | null
    _max: FuelMaxAggregateOutputType | null
  }

  type GetFuelGroupByPayload<T extends FuelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FuelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FuelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FuelGroupByOutputType[P]>
            : GetScalarType<T[P], FuelGroupByOutputType[P]>
        }
      >
    >


  export type FuelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    tripId?: boolean
    qtyGiven?: boolean
    unit?: boolean
    unitPrice?: boolean
    fuelCost?: boolean
    distanceKm?: boolean
    estimatedCO2?: boolean
    dieselEquivalentL?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fuel"]>

  export type FuelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    tripId?: boolean
    qtyGiven?: boolean
    unit?: boolean
    unitPrice?: boolean
    fuelCost?: boolean
    distanceKm?: boolean
    estimatedCO2?: boolean
    dieselEquivalentL?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fuel"]>

  export type FuelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    tripId?: boolean
    qtyGiven?: boolean
    unit?: boolean
    unitPrice?: boolean
    fuelCost?: boolean
    distanceKm?: boolean
    estimatedCO2?: boolean
    dieselEquivalentL?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fuel"]>

  export type FuelSelectScalar = {
    id?: boolean
    type?: boolean
    tripId?: boolean
    qtyGiven?: boolean
    unit?: boolean
    unitPrice?: boolean
    fuelCost?: boolean
    distanceKm?: boolean
    estimatedCO2?: boolean
    dieselEquivalentL?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FuelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "tripId" | "qtyGiven" | "unit" | "unitPrice" | "fuelCost" | "distanceKm" | "estimatedCO2" | "dieselEquivalentL" | "createdAt" | "updatedAt", ExtArgs["result"]["fuel"]>
  export type FuelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }
  export type FuelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }
  export type FuelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }

  export type $FuelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fuel"
    objects: {
      trip: Prisma.$TripPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.FuelType
      tripId: string
      qtyGiven: number
      unit: string
      unitPrice: number | null
      fuelCost: number | null
      distanceKm: number | null
      estimatedCO2: number | null
      dieselEquivalentL: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fuel"]>
    composites: {}
  }

  type FuelGetPayload<S extends boolean | null | undefined | FuelDefaultArgs> = $Result.GetResult<Prisma.$FuelPayload, S>

  type FuelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FuelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FuelCountAggregateInputType | true
    }

  export interface FuelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fuel'], meta: { name: 'Fuel' } }
    /**
     * Find zero or one Fuel that matches the filter.
     * @param {FuelFindUniqueArgs} args - Arguments to find a Fuel
     * @example
     * // Get one Fuel
     * const fuel = await prisma.fuel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FuelFindUniqueArgs>(args: SelectSubset<T, FuelFindUniqueArgs<ExtArgs>>): Prisma__FuelClient<$Result.GetResult<Prisma.$FuelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fuel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FuelFindUniqueOrThrowArgs} args - Arguments to find a Fuel
     * @example
     * // Get one Fuel
     * const fuel = await prisma.fuel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FuelFindUniqueOrThrowArgs>(args: SelectSubset<T, FuelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FuelClient<$Result.GetResult<Prisma.$FuelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fuel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelFindFirstArgs} args - Arguments to find a Fuel
     * @example
     * // Get one Fuel
     * const fuel = await prisma.fuel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FuelFindFirstArgs>(args?: SelectSubset<T, FuelFindFirstArgs<ExtArgs>>): Prisma__FuelClient<$Result.GetResult<Prisma.$FuelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fuel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelFindFirstOrThrowArgs} args - Arguments to find a Fuel
     * @example
     * // Get one Fuel
     * const fuel = await prisma.fuel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FuelFindFirstOrThrowArgs>(args?: SelectSubset<T, FuelFindFirstOrThrowArgs<ExtArgs>>): Prisma__FuelClient<$Result.GetResult<Prisma.$FuelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fuels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fuels
     * const fuels = await prisma.fuel.findMany()
     * 
     * // Get first 10 Fuels
     * const fuels = await prisma.fuel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fuelWithIdOnly = await prisma.fuel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FuelFindManyArgs>(args?: SelectSubset<T, FuelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FuelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fuel.
     * @param {FuelCreateArgs} args - Arguments to create a Fuel.
     * @example
     * // Create one Fuel
     * const Fuel = await prisma.fuel.create({
     *   data: {
     *     // ... data to create a Fuel
     *   }
     * })
     * 
     */
    create<T extends FuelCreateArgs>(args: SelectSubset<T, FuelCreateArgs<ExtArgs>>): Prisma__FuelClient<$Result.GetResult<Prisma.$FuelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fuels.
     * @param {FuelCreateManyArgs} args - Arguments to create many Fuels.
     * @example
     * // Create many Fuels
     * const fuel = await prisma.fuel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FuelCreateManyArgs>(args?: SelectSubset<T, FuelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Fuels and returns the data saved in the database.
     * @param {FuelCreateManyAndReturnArgs} args - Arguments to create many Fuels.
     * @example
     * // Create many Fuels
     * const fuel = await prisma.fuel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Fuels and only return the `id`
     * const fuelWithIdOnly = await prisma.fuel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FuelCreateManyAndReturnArgs>(args?: SelectSubset<T, FuelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FuelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Fuel.
     * @param {FuelDeleteArgs} args - Arguments to delete one Fuel.
     * @example
     * // Delete one Fuel
     * const Fuel = await prisma.fuel.delete({
     *   where: {
     *     // ... filter to delete one Fuel
     *   }
     * })
     * 
     */
    delete<T extends FuelDeleteArgs>(args: SelectSubset<T, FuelDeleteArgs<ExtArgs>>): Prisma__FuelClient<$Result.GetResult<Prisma.$FuelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fuel.
     * @param {FuelUpdateArgs} args - Arguments to update one Fuel.
     * @example
     * // Update one Fuel
     * const fuel = await prisma.fuel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FuelUpdateArgs>(args: SelectSubset<T, FuelUpdateArgs<ExtArgs>>): Prisma__FuelClient<$Result.GetResult<Prisma.$FuelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fuels.
     * @param {FuelDeleteManyArgs} args - Arguments to filter Fuels to delete.
     * @example
     * // Delete a few Fuels
     * const { count } = await prisma.fuel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FuelDeleteManyArgs>(args?: SelectSubset<T, FuelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fuels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fuels
     * const fuel = await prisma.fuel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FuelUpdateManyArgs>(args: SelectSubset<T, FuelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fuels and returns the data updated in the database.
     * @param {FuelUpdateManyAndReturnArgs} args - Arguments to update many Fuels.
     * @example
     * // Update many Fuels
     * const fuel = await prisma.fuel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Fuels and only return the `id`
     * const fuelWithIdOnly = await prisma.fuel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FuelUpdateManyAndReturnArgs>(args: SelectSubset<T, FuelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FuelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Fuel.
     * @param {FuelUpsertArgs} args - Arguments to update or create a Fuel.
     * @example
     * // Update or create a Fuel
     * const fuel = await prisma.fuel.upsert({
     *   create: {
     *     // ... data to create a Fuel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fuel we want to update
     *   }
     * })
     */
    upsert<T extends FuelUpsertArgs>(args: SelectSubset<T, FuelUpsertArgs<ExtArgs>>): Prisma__FuelClient<$Result.GetResult<Prisma.$FuelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fuels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelCountArgs} args - Arguments to filter Fuels to count.
     * @example
     * // Count the number of Fuels
     * const count = await prisma.fuel.count({
     *   where: {
     *     // ... the filter for the Fuels we want to count
     *   }
     * })
    **/
    count<T extends FuelCountArgs>(
      args?: Subset<T, FuelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FuelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fuel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FuelAggregateArgs>(args: Subset<T, FuelAggregateArgs>): Prisma.PrismaPromise<GetFuelAggregateType<T>>

    /**
     * Group by Fuel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FuelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FuelGroupByArgs['orderBy'] }
        : { orderBy?: FuelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FuelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFuelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fuel model
   */
  readonly fields: FuelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fuel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FuelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trip<T extends TripDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TripDefaultArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Fuel model
   */
  interface FuelFieldRefs {
    readonly id: FieldRef<"Fuel", 'String'>
    readonly type: FieldRef<"Fuel", 'FuelType'>
    readonly tripId: FieldRef<"Fuel", 'String'>
    readonly qtyGiven: FieldRef<"Fuel", 'Float'>
    readonly unit: FieldRef<"Fuel", 'String'>
    readonly unitPrice: FieldRef<"Fuel", 'Float'>
    readonly fuelCost: FieldRef<"Fuel", 'Float'>
    readonly distanceKm: FieldRef<"Fuel", 'Float'>
    readonly estimatedCO2: FieldRef<"Fuel", 'Float'>
    readonly dieselEquivalentL: FieldRef<"Fuel", 'Float'>
    readonly createdAt: FieldRef<"Fuel", 'DateTime'>
    readonly updatedAt: FieldRef<"Fuel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Fuel findUnique
   */
  export type FuelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInclude<ExtArgs> | null
    /**
     * Filter, which Fuel to fetch.
     */
    where: FuelWhereUniqueInput
  }

  /**
   * Fuel findUniqueOrThrow
   */
  export type FuelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInclude<ExtArgs> | null
    /**
     * Filter, which Fuel to fetch.
     */
    where: FuelWhereUniqueInput
  }

  /**
   * Fuel findFirst
   */
  export type FuelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInclude<ExtArgs> | null
    /**
     * Filter, which Fuel to fetch.
     */
    where?: FuelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fuels to fetch.
     */
    orderBy?: FuelOrderByWithRelationInput | FuelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fuels.
     */
    cursor?: FuelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fuels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fuels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fuels.
     */
    distinct?: FuelScalarFieldEnum | FuelScalarFieldEnum[]
  }

  /**
   * Fuel findFirstOrThrow
   */
  export type FuelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInclude<ExtArgs> | null
    /**
     * Filter, which Fuel to fetch.
     */
    where?: FuelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fuels to fetch.
     */
    orderBy?: FuelOrderByWithRelationInput | FuelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fuels.
     */
    cursor?: FuelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fuels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fuels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fuels.
     */
    distinct?: FuelScalarFieldEnum | FuelScalarFieldEnum[]
  }

  /**
   * Fuel findMany
   */
  export type FuelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInclude<ExtArgs> | null
    /**
     * Filter, which Fuels to fetch.
     */
    where?: FuelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fuels to fetch.
     */
    orderBy?: FuelOrderByWithRelationInput | FuelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fuels.
     */
    cursor?: FuelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fuels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fuels.
     */
    skip?: number
    distinct?: FuelScalarFieldEnum | FuelScalarFieldEnum[]
  }

  /**
   * Fuel create
   */
  export type FuelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInclude<ExtArgs> | null
    /**
     * The data needed to create a Fuel.
     */
    data: XOR<FuelCreateInput, FuelUncheckedCreateInput>
  }

  /**
   * Fuel createMany
   */
  export type FuelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fuels.
     */
    data: FuelCreateManyInput | FuelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fuel createManyAndReturn
   */
  export type FuelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * The data used to create many Fuels.
     */
    data: FuelCreateManyInput | FuelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fuel update
   */
  export type FuelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInclude<ExtArgs> | null
    /**
     * The data needed to update a Fuel.
     */
    data: XOR<FuelUpdateInput, FuelUncheckedUpdateInput>
    /**
     * Choose, which Fuel to update.
     */
    where: FuelWhereUniqueInput
  }

  /**
   * Fuel updateMany
   */
  export type FuelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fuels.
     */
    data: XOR<FuelUpdateManyMutationInput, FuelUncheckedUpdateManyInput>
    /**
     * Filter which Fuels to update
     */
    where?: FuelWhereInput
    /**
     * Limit how many Fuels to update.
     */
    limit?: number
  }

  /**
   * Fuel updateManyAndReturn
   */
  export type FuelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * The data used to update Fuels.
     */
    data: XOR<FuelUpdateManyMutationInput, FuelUncheckedUpdateManyInput>
    /**
     * Filter which Fuels to update
     */
    where?: FuelWhereInput
    /**
     * Limit how many Fuels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fuel upsert
   */
  export type FuelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInclude<ExtArgs> | null
    /**
     * The filter to search for the Fuel to update in case it exists.
     */
    where: FuelWhereUniqueInput
    /**
     * In case the Fuel found by the `where` argument doesn't exist, create a new Fuel with this data.
     */
    create: XOR<FuelCreateInput, FuelUncheckedCreateInput>
    /**
     * In case the Fuel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FuelUpdateInput, FuelUncheckedUpdateInput>
  }

  /**
   * Fuel delete
   */
  export type FuelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInclude<ExtArgs> | null
    /**
     * Filter which Fuel to delete.
     */
    where: FuelWhereUniqueInput
  }

  /**
   * Fuel deleteMany
   */
  export type FuelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fuels to delete
     */
    where?: FuelWhereInput
    /**
     * Limit how many Fuels to delete.
     */
    limit?: number
  }

  /**
   * Fuel without action
   */
  export type FuelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fuel
     */
    select?: FuelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fuel
     */
    omit?: FuelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInclude<ExtArgs> | null
  }


  /**
   * Model Part
   */

  export type AggregatePart = {
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  export type PartAvgAggregateOutputType = {
    quantity: number | null
    unitCost: number | null
    totalCost: number | null
  }

  export type PartSumAggregateOutputType = {
    quantity: number | null
    unitCost: number | null
    totalCost: number | null
  }

  export type PartMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    repairId: string | null
    name: string | null
    partNumber: string | null
    category: string | null
    quantity: number | null
    unitCost: number | null
    totalCost: number | null
    supplier: string | null
    supplierPhone: string | null
    purchaseDate: Date | null
    fittedDate: Date | null
    warrantyExpiry: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PartMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    repairId: string | null
    name: string | null
    partNumber: string | null
    category: string | null
    quantity: number | null
    unitCost: number | null
    totalCost: number | null
    supplier: string | null
    supplierPhone: string | null
    purchaseDate: Date | null
    fittedDate: Date | null
    warrantyExpiry: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PartCountAggregateOutputType = {
    id: number
    vehicleId: number
    repairId: number
    name: number
    partNumber: number
    category: number
    quantity: number
    unitCost: number
    totalCost: number
    supplier: number
    supplierPhone: number
    purchaseDate: number
    fittedDate: number
    warrantyExpiry: number
    notes: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type PartAvgAggregateInputType = {
    quantity?: true
    unitCost?: true
    totalCost?: true
  }

  export type PartSumAggregateInputType = {
    quantity?: true
    unitCost?: true
    totalCost?: true
  }

  export type PartMinAggregateInputType = {
    id?: true
    vehicleId?: true
    repairId?: true
    name?: true
    partNumber?: true
    category?: true
    quantity?: true
    unitCost?: true
    totalCost?: true
    supplier?: true
    supplierPhone?: true
    purchaseDate?: true
    fittedDate?: true
    warrantyExpiry?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PartMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    repairId?: true
    name?: true
    partNumber?: true
    category?: true
    quantity?: true
    unitCost?: true
    totalCost?: true
    supplier?: true
    supplierPhone?: true
    purchaseDate?: true
    fittedDate?: true
    warrantyExpiry?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PartCountAggregateInputType = {
    id?: true
    vehicleId?: true
    repairId?: true
    name?: true
    partNumber?: true
    category?: true
    quantity?: true
    unitCost?: true
    totalCost?: true
    supplier?: true
    supplierPhone?: true
    purchaseDate?: true
    fittedDate?: true
    warrantyExpiry?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type PartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Part to aggregate.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parts
    **/
    _count?: true | PartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartMaxAggregateInputType
  }

  export type GetPartAggregateType<T extends PartAggregateArgs> = {
        [P in keyof T & keyof AggregatePart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePart[P]>
      : GetScalarType<T[P], AggregatePart[P]>
  }




  export type PartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
    orderBy?: PartOrderByWithAggregationInput | PartOrderByWithAggregationInput[]
    by: PartScalarFieldEnum[] | PartScalarFieldEnum
    having?: PartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartCountAggregateInputType | true
    _avg?: PartAvgAggregateInputType
    _sum?: PartSumAggregateInputType
    _min?: PartMinAggregateInputType
    _max?: PartMaxAggregateInputType
  }

  export type PartGroupByOutputType = {
    id: string
    vehicleId: string
    repairId: string | null
    name: string
    partNumber: string | null
    category: string | null
    quantity: number
    unitCost: number
    totalCost: number
    supplier: string | null
    supplierPhone: string | null
    purchaseDate: Date | null
    fittedDate: Date | null
    warrantyExpiry: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  type GetPartGroupByPayload<T extends PartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartGroupByOutputType[P]>
            : GetScalarType<T[P], PartGroupByOutputType[P]>
        }
      >
    >


  export type PartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    repairId?: boolean
    name?: boolean
    partNumber?: boolean
    category?: boolean
    quantity?: boolean
    unitCost?: boolean
    totalCost?: boolean
    supplier?: boolean
    supplierPhone?: boolean
    purchaseDate?: boolean
    fittedDate?: boolean
    warrantyExpiry?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    repair?: boolean | Part$repairArgs<ExtArgs>
  }, ExtArgs["result"]["part"]>

  export type PartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    repairId?: boolean
    name?: boolean
    partNumber?: boolean
    category?: boolean
    quantity?: boolean
    unitCost?: boolean
    totalCost?: boolean
    supplier?: boolean
    supplierPhone?: boolean
    purchaseDate?: boolean
    fittedDate?: boolean
    warrantyExpiry?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    repair?: boolean | Part$repairArgs<ExtArgs>
  }, ExtArgs["result"]["part"]>

  export type PartSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    repairId?: boolean
    name?: boolean
    partNumber?: boolean
    category?: boolean
    quantity?: boolean
    unitCost?: boolean
    totalCost?: boolean
    supplier?: boolean
    supplierPhone?: boolean
    purchaseDate?: boolean
    fittedDate?: boolean
    warrantyExpiry?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    repair?: boolean | Part$repairArgs<ExtArgs>
  }, ExtArgs["result"]["part"]>

  export type PartSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    repairId?: boolean
    name?: boolean
    partNumber?: boolean
    category?: boolean
    quantity?: boolean
    unitCost?: boolean
    totalCost?: boolean
    supplier?: boolean
    supplierPhone?: boolean
    purchaseDate?: boolean
    fittedDate?: boolean
    warrantyExpiry?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type PartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vehicleId" | "repairId" | "name" | "partNumber" | "category" | "quantity" | "unitCost" | "totalCost" | "supplier" | "supplierPhone" | "purchaseDate" | "fittedDate" | "warrantyExpiry" | "notes" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["part"]>
  export type PartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    repair?: boolean | Part$repairArgs<ExtArgs>
  }
  export type PartIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    repair?: boolean | Part$repairArgs<ExtArgs>
  }
  export type PartIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    repair?: boolean | Part$repairArgs<ExtArgs>
  }

  export type $PartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Part"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
      repair: Prisma.$RepairPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      repairId: string | null
      name: string
      partNumber: string | null
      category: string | null
      quantity: number
      unitCost: number
      totalCost: number
      supplier: string | null
      supplierPhone: string | null
      purchaseDate: Date | null
      fittedDate: Date | null
      warrantyExpiry: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["part"]>
    composites: {}
  }

  type PartGetPayload<S extends boolean | null | undefined | PartDefaultArgs> = $Result.GetResult<Prisma.$PartPayload, S>

  type PartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartCountAggregateInputType | true
    }

  export interface PartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Part'], meta: { name: 'Part' } }
    /**
     * Find zero or one Part that matches the filter.
     * @param {PartFindUniqueArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartFindUniqueArgs>(args: SelectSubset<T, PartFindUniqueArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Part that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartFindUniqueOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartFindUniqueOrThrowArgs>(args: SelectSubset<T, PartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Part that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartFindFirstArgs>(args?: SelectSubset<T, PartFindFirstArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Part that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartFindFirstOrThrowArgs>(args?: SelectSubset<T, PartFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parts
     * const parts = await prisma.part.findMany()
     * 
     * // Get first 10 Parts
     * const parts = await prisma.part.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partWithIdOnly = await prisma.part.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartFindManyArgs>(args?: SelectSubset<T, PartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Part.
     * @param {PartCreateArgs} args - Arguments to create a Part.
     * @example
     * // Create one Part
     * const Part = await prisma.part.create({
     *   data: {
     *     // ... data to create a Part
     *   }
     * })
     * 
     */
    create<T extends PartCreateArgs>(args: SelectSubset<T, PartCreateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parts.
     * @param {PartCreateManyArgs} args - Arguments to create many Parts.
     * @example
     * // Create many Parts
     * const part = await prisma.part.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartCreateManyArgs>(args?: SelectSubset<T, PartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Parts and returns the data saved in the database.
     * @param {PartCreateManyAndReturnArgs} args - Arguments to create many Parts.
     * @example
     * // Create many Parts
     * const part = await prisma.part.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Parts and only return the `id`
     * const partWithIdOnly = await prisma.part.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartCreateManyAndReturnArgs>(args?: SelectSubset<T, PartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Part.
     * @param {PartDeleteArgs} args - Arguments to delete one Part.
     * @example
     * // Delete one Part
     * const Part = await prisma.part.delete({
     *   where: {
     *     // ... filter to delete one Part
     *   }
     * })
     * 
     */
    delete<T extends PartDeleteArgs>(args: SelectSubset<T, PartDeleteArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Part.
     * @param {PartUpdateArgs} args - Arguments to update one Part.
     * @example
     * // Update one Part
     * const part = await prisma.part.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartUpdateArgs>(args: SelectSubset<T, PartUpdateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parts.
     * @param {PartDeleteManyArgs} args - Arguments to filter Parts to delete.
     * @example
     * // Delete a few Parts
     * const { count } = await prisma.part.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartDeleteManyArgs>(args?: SelectSubset<T, PartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parts
     * const part = await prisma.part.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartUpdateManyArgs>(args: SelectSubset<T, PartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parts and returns the data updated in the database.
     * @param {PartUpdateManyAndReturnArgs} args - Arguments to update many Parts.
     * @example
     * // Update many Parts
     * const part = await prisma.part.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Parts and only return the `id`
     * const partWithIdOnly = await prisma.part.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PartUpdateManyAndReturnArgs>(args: SelectSubset<T, PartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Part.
     * @param {PartUpsertArgs} args - Arguments to update or create a Part.
     * @example
     * // Update or create a Part
     * const part = await prisma.part.upsert({
     *   create: {
     *     // ... data to create a Part
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Part we want to update
     *   }
     * })
     */
    upsert<T extends PartUpsertArgs>(args: SelectSubset<T, PartUpsertArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCountArgs} args - Arguments to filter Parts to count.
     * @example
     * // Count the number of Parts
     * const count = await prisma.part.count({
     *   where: {
     *     // ... the filter for the Parts we want to count
     *   }
     * })
    **/
    count<T extends PartCountArgs>(
      args?: Subset<T, PartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartAggregateArgs>(args: Subset<T, PartAggregateArgs>): Prisma.PrismaPromise<GetPartAggregateType<T>>

    /**
     * Group by Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartGroupByArgs['orderBy'] }
        : { orderBy?: PartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Part model
   */
  readonly fields: PartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Part.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    repair<T extends Part$repairArgs<ExtArgs> = {}>(args?: Subset<T, Part$repairArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Part model
   */
  interface PartFieldRefs {
    readonly id: FieldRef<"Part", 'String'>
    readonly vehicleId: FieldRef<"Part", 'String'>
    readonly repairId: FieldRef<"Part", 'String'>
    readonly name: FieldRef<"Part", 'String'>
    readonly partNumber: FieldRef<"Part", 'String'>
    readonly category: FieldRef<"Part", 'String'>
    readonly quantity: FieldRef<"Part", 'Int'>
    readonly unitCost: FieldRef<"Part", 'Float'>
    readonly totalCost: FieldRef<"Part", 'Float'>
    readonly supplier: FieldRef<"Part", 'String'>
    readonly supplierPhone: FieldRef<"Part", 'String'>
    readonly purchaseDate: FieldRef<"Part", 'DateTime'>
    readonly fittedDate: FieldRef<"Part", 'DateTime'>
    readonly warrantyExpiry: FieldRef<"Part", 'DateTime'>
    readonly notes: FieldRef<"Part", 'String'>
    readonly createdAt: FieldRef<"Part", 'DateTime'>
    readonly updatedAt: FieldRef<"Part", 'DateTime'>
    readonly deletedAt: FieldRef<"Part", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Part findUnique
   */
  export type PartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findUniqueOrThrow
   */
  export type PartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findFirst
   */
  export type PartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findFirstOrThrow
   */
  export type PartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findMany
   */
  export type PartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Parts to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part create
   */
  export type PartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to create a Part.
     */
    data: XOR<PartCreateInput, PartUncheckedCreateInput>
  }

  /**
   * Part createMany
   */
  export type PartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parts.
     */
    data: PartCreateManyInput | PartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Part createManyAndReturn
   */
  export type PartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * The data used to create many Parts.
     */
    data: PartCreateManyInput | PartCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Part update
   */
  export type PartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to update a Part.
     */
    data: XOR<PartUpdateInput, PartUncheckedUpdateInput>
    /**
     * Choose, which Part to update.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part updateMany
   */
  export type PartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parts.
     */
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyInput>
    /**
     * Filter which Parts to update
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to update.
     */
    limit?: number
  }

  /**
   * Part updateManyAndReturn
   */
  export type PartUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * The data used to update Parts.
     */
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyInput>
    /**
     * Filter which Parts to update
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Part upsert
   */
  export type PartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The filter to search for the Part to update in case it exists.
     */
    where: PartWhereUniqueInput
    /**
     * In case the Part found by the `where` argument doesn't exist, create a new Part with this data.
     */
    create: XOR<PartCreateInput, PartUncheckedCreateInput>
    /**
     * In case the Part was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartUpdateInput, PartUncheckedUpdateInput>
  }

  /**
   * Part delete
   */
  export type PartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter which Part to delete.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part deleteMany
   */
  export type PartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parts to delete
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to delete.
     */
    limit?: number
  }

  /**
   * Part.repair
   */
  export type Part$repairArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
    where?: RepairWhereInput
  }

  /**
   * Part without action
   */
  export type PartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    odometerKm: number | null
    nextServiceKm: number | null
    laborCost: number | null
    partsCost: number | null
    totalCost: number | null
  }

  export type ServiceSumAggregateOutputType = {
    odometerKm: number | null
    nextServiceKm: number | null
    laborCost: number | null
    partsCost: number | null
    totalCost: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    driverId: string | null
    serviceType: $Enums.ServiceType | null
    status: $Enums.ServiceStatus | null
    description: string | null
    odometerKm: number | null
    nextServiceKm: number | null
    nextServiceDate: Date | null
    laborCost: number | null
    partsCost: number | null
    totalCost: number | null
    garage: string | null
    garagePhone: string | null
    scheduledDate: Date | null
    completedDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    driverId: string | null
    serviceType: $Enums.ServiceType | null
    status: $Enums.ServiceStatus | null
    description: string | null
    odometerKm: number | null
    nextServiceKm: number | null
    nextServiceDate: Date | null
    laborCost: number | null
    partsCost: number | null
    totalCost: number | null
    garage: string | null
    garagePhone: string | null
    scheduledDate: Date | null
    completedDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    vehicleId: number
    driverId: number
    serviceType: number
    status: number
    description: number
    odometerKm: number
    nextServiceKm: number
    nextServiceDate: number
    laborCost: number
    partsCost: number
    totalCost: number
    garage: number
    garagePhone: number
    scheduledDate: number
    completedDate: number
    notes: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    odometerKm?: true
    nextServiceKm?: true
    laborCost?: true
    partsCost?: true
    totalCost?: true
  }

  export type ServiceSumAggregateInputType = {
    odometerKm?: true
    nextServiceKm?: true
    laborCost?: true
    partsCost?: true
    totalCost?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    vehicleId?: true
    driverId?: true
    serviceType?: true
    status?: true
    description?: true
    odometerKm?: true
    nextServiceKm?: true
    nextServiceDate?: true
    laborCost?: true
    partsCost?: true
    totalCost?: true
    garage?: true
    garagePhone?: true
    scheduledDate?: true
    completedDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    driverId?: true
    serviceType?: true
    status?: true
    description?: true
    odometerKm?: true
    nextServiceKm?: true
    nextServiceDate?: true
    laborCost?: true
    partsCost?: true
    totalCost?: true
    garage?: true
    garagePhone?: true
    scheduledDate?: true
    completedDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    vehicleId?: true
    driverId?: true
    serviceType?: true
    status?: true
    description?: true
    odometerKm?: true
    nextServiceKm?: true
    nextServiceDate?: true
    laborCost?: true
    partsCost?: true
    totalCost?: true
    garage?: true
    garagePhone?: true
    scheduledDate?: true
    completedDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    vehicleId: string
    driverId: string | null
    serviceType: $Enums.ServiceType
    status: $Enums.ServiceStatus
    description: string | null
    odometerKm: number | null
    nextServiceKm: number | null
    nextServiceDate: Date | null
    laborCost: number | null
    partsCost: number | null
    totalCost: number | null
    garage: string | null
    garagePhone: string | null
    scheduledDate: Date | null
    completedDate: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    serviceType?: boolean
    status?: boolean
    description?: boolean
    odometerKm?: boolean
    nextServiceKm?: boolean
    nextServiceDate?: boolean
    laborCost?: boolean
    partsCost?: boolean
    totalCost?: boolean
    garage?: boolean
    garagePhone?: boolean
    scheduledDate?: boolean
    completedDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | Service$driverArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    serviceType?: boolean
    status?: boolean
    description?: boolean
    odometerKm?: boolean
    nextServiceKm?: boolean
    nextServiceDate?: boolean
    laborCost?: boolean
    partsCost?: boolean
    totalCost?: boolean
    garage?: boolean
    garagePhone?: boolean
    scheduledDate?: boolean
    completedDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | Service$driverArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    serviceType?: boolean
    status?: boolean
    description?: boolean
    odometerKm?: boolean
    nextServiceKm?: boolean
    nextServiceDate?: boolean
    laborCost?: boolean
    partsCost?: boolean
    totalCost?: boolean
    garage?: boolean
    garagePhone?: boolean
    scheduledDate?: boolean
    completedDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | Service$driverArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    serviceType?: boolean
    status?: boolean
    description?: boolean
    odometerKm?: boolean
    nextServiceKm?: boolean
    nextServiceDate?: boolean
    laborCost?: boolean
    partsCost?: boolean
    totalCost?: boolean
    garage?: boolean
    garagePhone?: boolean
    scheduledDate?: boolean
    completedDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vehicleId" | "driverId" | "serviceType" | "status" | "description" | "odometerKm" | "nextServiceKm" | "nextServiceDate" | "laborCost" | "partsCost" | "totalCost" | "garage" | "garagePhone" | "scheduledDate" | "completedDate" | "notes" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | Service$driverArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | Service$driverArgs<ExtArgs>
  }
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | Service$driverArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
      driver: Prisma.$DriverPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      driverId: string | null
      serviceType: $Enums.ServiceType
      status: $Enums.ServiceStatus
      description: string | null
      odometerKm: number | null
      nextServiceKm: number | null
      nextServiceDate: Date | null
      laborCost: number | null
      partsCost: number | null
      totalCost: number | null
      garage: string | null
      garagePhone: string | null
      scheduledDate: Date | null
      completedDate: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    driver<T extends Service$driverArgs<ExtArgs> = {}>(args?: Subset<T, Service$driverArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly vehicleId: FieldRef<"Service", 'String'>
    readonly driverId: FieldRef<"Service", 'String'>
    readonly serviceType: FieldRef<"Service", 'ServiceType'>
    readonly status: FieldRef<"Service", 'ServiceStatus'>
    readonly description: FieldRef<"Service", 'String'>
    readonly odometerKm: FieldRef<"Service", 'Int'>
    readonly nextServiceKm: FieldRef<"Service", 'Int'>
    readonly nextServiceDate: FieldRef<"Service", 'DateTime'>
    readonly laborCost: FieldRef<"Service", 'Float'>
    readonly partsCost: FieldRef<"Service", 'Float'>
    readonly totalCost: FieldRef<"Service", 'Float'>
    readonly garage: FieldRef<"Service", 'String'>
    readonly garagePhone: FieldRef<"Service", 'String'>
    readonly scheduledDate: FieldRef<"Service", 'DateTime'>
    readonly completedDate: FieldRef<"Service", 'DateTime'>
    readonly notes: FieldRef<"Service", 'String'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
    readonly deletedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.driver
   */
  export type Service$driverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    where?: DriverWhereInput
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model Repair
   */

  export type AggregateRepair = {
    _count: RepairCountAggregateOutputType | null
    _avg: RepairAvgAggregateOutputType | null
    _sum: RepairSumAggregateOutputType | null
    _min: RepairMinAggregateOutputType | null
    _max: RepairMaxAggregateOutputType | null
  }

  export type RepairAvgAggregateOutputType = {
    odometerKm: number | null
    laborCost: number | null
    partsCost: number | null
    totalCost: number | null
  }

  export type RepairSumAggregateOutputType = {
    odometerKm: number | null
    laborCost: number | null
    partsCost: number | null
    totalCost: number | null
  }

  export type RepairMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    driverId: string | null
    status: $Enums.RepairStatus | null
    priority: $Enums.RepairPriority | null
    faultDesc: string | null
    repairDesc: string | null
    odometerKm: number | null
    laborCost: number | null
    partsCost: number | null
    totalCost: number | null
    garage: string | null
    garagePhone: string | null
    reportedDate: Date | null
    startedDate: Date | null
    completedDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type RepairMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    driverId: string | null
    status: $Enums.RepairStatus | null
    priority: $Enums.RepairPriority | null
    faultDesc: string | null
    repairDesc: string | null
    odometerKm: number | null
    laborCost: number | null
    partsCost: number | null
    totalCost: number | null
    garage: string | null
    garagePhone: string | null
    reportedDate: Date | null
    startedDate: Date | null
    completedDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type RepairCountAggregateOutputType = {
    id: number
    vehicleId: number
    driverId: number
    status: number
    priority: number
    faultDesc: number
    repairDesc: number
    odometerKm: number
    laborCost: number
    partsCost: number
    totalCost: number
    garage: number
    garagePhone: number
    reportedDate: number
    startedDate: number
    completedDate: number
    notes: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type RepairAvgAggregateInputType = {
    odometerKm?: true
    laborCost?: true
    partsCost?: true
    totalCost?: true
  }

  export type RepairSumAggregateInputType = {
    odometerKm?: true
    laborCost?: true
    partsCost?: true
    totalCost?: true
  }

  export type RepairMinAggregateInputType = {
    id?: true
    vehicleId?: true
    driverId?: true
    status?: true
    priority?: true
    faultDesc?: true
    repairDesc?: true
    odometerKm?: true
    laborCost?: true
    partsCost?: true
    totalCost?: true
    garage?: true
    garagePhone?: true
    reportedDate?: true
    startedDate?: true
    completedDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type RepairMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    driverId?: true
    status?: true
    priority?: true
    faultDesc?: true
    repairDesc?: true
    odometerKm?: true
    laborCost?: true
    partsCost?: true
    totalCost?: true
    garage?: true
    garagePhone?: true
    reportedDate?: true
    startedDate?: true
    completedDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type RepairCountAggregateInputType = {
    id?: true
    vehicleId?: true
    driverId?: true
    status?: true
    priority?: true
    faultDesc?: true
    repairDesc?: true
    odometerKm?: true
    laborCost?: true
    partsCost?: true
    totalCost?: true
    garage?: true
    garagePhone?: true
    reportedDate?: true
    startedDate?: true
    completedDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type RepairAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Repair to aggregate.
     */
    where?: RepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repairs to fetch.
     */
    orderBy?: RepairOrderByWithRelationInput | RepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Repairs
    **/
    _count?: true | RepairCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepairAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepairSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepairMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepairMaxAggregateInputType
  }

  export type GetRepairAggregateType<T extends RepairAggregateArgs> = {
        [P in keyof T & keyof AggregateRepair]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepair[P]>
      : GetScalarType<T[P], AggregateRepair[P]>
  }




  export type RepairGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairWhereInput
    orderBy?: RepairOrderByWithAggregationInput | RepairOrderByWithAggregationInput[]
    by: RepairScalarFieldEnum[] | RepairScalarFieldEnum
    having?: RepairScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepairCountAggregateInputType | true
    _avg?: RepairAvgAggregateInputType
    _sum?: RepairSumAggregateInputType
    _min?: RepairMinAggregateInputType
    _max?: RepairMaxAggregateInputType
  }

  export type RepairGroupByOutputType = {
    id: string
    vehicleId: string
    driverId: string | null
    status: $Enums.RepairStatus
    priority: $Enums.RepairPriority
    faultDesc: string
    repairDesc: string | null
    odometerKm: number | null
    laborCost: number | null
    partsCost: number | null
    totalCost: number | null
    garage: string | null
    garagePhone: string | null
    reportedDate: Date
    startedDate: Date | null
    completedDate: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: RepairCountAggregateOutputType | null
    _avg: RepairAvgAggregateOutputType | null
    _sum: RepairSumAggregateOutputType | null
    _min: RepairMinAggregateOutputType | null
    _max: RepairMaxAggregateOutputType | null
  }

  type GetRepairGroupByPayload<T extends RepairGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepairGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepairGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepairGroupByOutputType[P]>
            : GetScalarType<T[P], RepairGroupByOutputType[P]>
        }
      >
    >


  export type RepairSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    status?: boolean
    priority?: boolean
    faultDesc?: boolean
    repairDesc?: boolean
    odometerKm?: boolean
    laborCost?: boolean
    partsCost?: boolean
    totalCost?: boolean
    garage?: boolean
    garagePhone?: boolean
    reportedDate?: boolean
    startedDate?: boolean
    completedDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | Repair$driverArgs<ExtArgs>
    parts?: boolean | Repair$partsArgs<ExtArgs>
    _count?: boolean | RepairCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repair"]>

  export type RepairSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    status?: boolean
    priority?: boolean
    faultDesc?: boolean
    repairDesc?: boolean
    odometerKm?: boolean
    laborCost?: boolean
    partsCost?: boolean
    totalCost?: boolean
    garage?: boolean
    garagePhone?: boolean
    reportedDate?: boolean
    startedDate?: boolean
    completedDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | Repair$driverArgs<ExtArgs>
  }, ExtArgs["result"]["repair"]>

  export type RepairSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    status?: boolean
    priority?: boolean
    faultDesc?: boolean
    repairDesc?: boolean
    odometerKm?: boolean
    laborCost?: boolean
    partsCost?: boolean
    totalCost?: boolean
    garage?: boolean
    garagePhone?: boolean
    reportedDate?: boolean
    startedDate?: boolean
    completedDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | Repair$driverArgs<ExtArgs>
  }, ExtArgs["result"]["repair"]>

  export type RepairSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    driverId?: boolean
    status?: boolean
    priority?: boolean
    faultDesc?: boolean
    repairDesc?: boolean
    odometerKm?: boolean
    laborCost?: boolean
    partsCost?: boolean
    totalCost?: boolean
    garage?: boolean
    garagePhone?: boolean
    reportedDate?: boolean
    startedDate?: boolean
    completedDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type RepairOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vehicleId" | "driverId" | "status" | "priority" | "faultDesc" | "repairDesc" | "odometerKm" | "laborCost" | "partsCost" | "totalCost" | "garage" | "garagePhone" | "reportedDate" | "startedDate" | "completedDate" | "notes" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["repair"]>
  export type RepairInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | Repair$driverArgs<ExtArgs>
    parts?: boolean | Repair$partsArgs<ExtArgs>
    _count?: boolean | RepairCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RepairIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | Repair$driverArgs<ExtArgs>
  }
  export type RepairIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    driver?: boolean | Repair$driverArgs<ExtArgs>
  }

  export type $RepairPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Repair"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
      driver: Prisma.$DriverPayload<ExtArgs> | null
      parts: Prisma.$PartPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      driverId: string | null
      status: $Enums.RepairStatus
      priority: $Enums.RepairPriority
      faultDesc: string
      repairDesc: string | null
      odometerKm: number | null
      laborCost: number | null
      partsCost: number | null
      totalCost: number | null
      garage: string | null
      garagePhone: string | null
      reportedDate: Date
      startedDate: Date | null
      completedDate: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["repair"]>
    composites: {}
  }

  type RepairGetPayload<S extends boolean | null | undefined | RepairDefaultArgs> = $Result.GetResult<Prisma.$RepairPayload, S>

  type RepairCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepairFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RepairCountAggregateInputType | true
    }

  export interface RepairDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Repair'], meta: { name: 'Repair' } }
    /**
     * Find zero or one Repair that matches the filter.
     * @param {RepairFindUniqueArgs} args - Arguments to find a Repair
     * @example
     * // Get one Repair
     * const repair = await prisma.repair.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepairFindUniqueArgs>(args: SelectSubset<T, RepairFindUniqueArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Repair that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepairFindUniqueOrThrowArgs} args - Arguments to find a Repair
     * @example
     * // Get one Repair
     * const repair = await prisma.repair.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepairFindUniqueOrThrowArgs>(args: SelectSubset<T, RepairFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Repair that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairFindFirstArgs} args - Arguments to find a Repair
     * @example
     * // Get one Repair
     * const repair = await prisma.repair.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepairFindFirstArgs>(args?: SelectSubset<T, RepairFindFirstArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Repair that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairFindFirstOrThrowArgs} args - Arguments to find a Repair
     * @example
     * // Get one Repair
     * const repair = await prisma.repair.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepairFindFirstOrThrowArgs>(args?: SelectSubset<T, RepairFindFirstOrThrowArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Repairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Repairs
     * const repairs = await prisma.repair.findMany()
     * 
     * // Get first 10 Repairs
     * const repairs = await prisma.repair.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repairWithIdOnly = await prisma.repair.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RepairFindManyArgs>(args?: SelectSubset<T, RepairFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Repair.
     * @param {RepairCreateArgs} args - Arguments to create a Repair.
     * @example
     * // Create one Repair
     * const Repair = await prisma.repair.create({
     *   data: {
     *     // ... data to create a Repair
     *   }
     * })
     * 
     */
    create<T extends RepairCreateArgs>(args: SelectSubset<T, RepairCreateArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Repairs.
     * @param {RepairCreateManyArgs} args - Arguments to create many Repairs.
     * @example
     * // Create many Repairs
     * const repair = await prisma.repair.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RepairCreateManyArgs>(args?: SelectSubset<T, RepairCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Repairs and returns the data saved in the database.
     * @param {RepairCreateManyAndReturnArgs} args - Arguments to create many Repairs.
     * @example
     * // Create many Repairs
     * const repair = await prisma.repair.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Repairs and only return the `id`
     * const repairWithIdOnly = await prisma.repair.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RepairCreateManyAndReturnArgs>(args?: SelectSubset<T, RepairCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Repair.
     * @param {RepairDeleteArgs} args - Arguments to delete one Repair.
     * @example
     * // Delete one Repair
     * const Repair = await prisma.repair.delete({
     *   where: {
     *     // ... filter to delete one Repair
     *   }
     * })
     * 
     */
    delete<T extends RepairDeleteArgs>(args: SelectSubset<T, RepairDeleteArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Repair.
     * @param {RepairUpdateArgs} args - Arguments to update one Repair.
     * @example
     * // Update one Repair
     * const repair = await prisma.repair.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RepairUpdateArgs>(args: SelectSubset<T, RepairUpdateArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Repairs.
     * @param {RepairDeleteManyArgs} args - Arguments to filter Repairs to delete.
     * @example
     * // Delete a few Repairs
     * const { count } = await prisma.repair.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RepairDeleteManyArgs>(args?: SelectSubset<T, RepairDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Repairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Repairs
     * const repair = await prisma.repair.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RepairUpdateManyArgs>(args: SelectSubset<T, RepairUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Repairs and returns the data updated in the database.
     * @param {RepairUpdateManyAndReturnArgs} args - Arguments to update many Repairs.
     * @example
     * // Update many Repairs
     * const repair = await prisma.repair.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Repairs and only return the `id`
     * const repairWithIdOnly = await prisma.repair.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RepairUpdateManyAndReturnArgs>(args: SelectSubset<T, RepairUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Repair.
     * @param {RepairUpsertArgs} args - Arguments to update or create a Repair.
     * @example
     * // Update or create a Repair
     * const repair = await prisma.repair.upsert({
     *   create: {
     *     // ... data to create a Repair
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Repair we want to update
     *   }
     * })
     */
    upsert<T extends RepairUpsertArgs>(args: SelectSubset<T, RepairUpsertArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Repairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairCountArgs} args - Arguments to filter Repairs to count.
     * @example
     * // Count the number of Repairs
     * const count = await prisma.repair.count({
     *   where: {
     *     // ... the filter for the Repairs we want to count
     *   }
     * })
    **/
    count<T extends RepairCountArgs>(
      args?: Subset<T, RepairCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepairCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Repair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepairAggregateArgs>(args: Subset<T, RepairAggregateArgs>): Prisma.PrismaPromise<GetRepairAggregateType<T>>

    /**
     * Group by Repair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepairGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepairGroupByArgs['orderBy'] }
        : { orderBy?: RepairGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepairGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepairGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Repair model
   */
  readonly fields: RepairFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Repair.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepairClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    driver<T extends Repair$driverArgs<ExtArgs> = {}>(args?: Subset<T, Repair$driverArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    parts<T extends Repair$partsArgs<ExtArgs> = {}>(args?: Subset<T, Repair$partsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Repair model
   */
  interface RepairFieldRefs {
    readonly id: FieldRef<"Repair", 'String'>
    readonly vehicleId: FieldRef<"Repair", 'String'>
    readonly driverId: FieldRef<"Repair", 'String'>
    readonly status: FieldRef<"Repair", 'RepairStatus'>
    readonly priority: FieldRef<"Repair", 'RepairPriority'>
    readonly faultDesc: FieldRef<"Repair", 'String'>
    readonly repairDesc: FieldRef<"Repair", 'String'>
    readonly odometerKm: FieldRef<"Repair", 'Int'>
    readonly laborCost: FieldRef<"Repair", 'Float'>
    readonly partsCost: FieldRef<"Repair", 'Float'>
    readonly totalCost: FieldRef<"Repair", 'Float'>
    readonly garage: FieldRef<"Repair", 'String'>
    readonly garagePhone: FieldRef<"Repair", 'String'>
    readonly reportedDate: FieldRef<"Repair", 'DateTime'>
    readonly startedDate: FieldRef<"Repair", 'DateTime'>
    readonly completedDate: FieldRef<"Repair", 'DateTime'>
    readonly notes: FieldRef<"Repair", 'String'>
    readonly createdAt: FieldRef<"Repair", 'DateTime'>
    readonly updatedAt: FieldRef<"Repair", 'DateTime'>
    readonly deletedAt: FieldRef<"Repair", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Repair findUnique
   */
  export type RepairFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * Filter, which Repair to fetch.
     */
    where: RepairWhereUniqueInput
  }

  /**
   * Repair findUniqueOrThrow
   */
  export type RepairFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * Filter, which Repair to fetch.
     */
    where: RepairWhereUniqueInput
  }

  /**
   * Repair findFirst
   */
  export type RepairFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * Filter, which Repair to fetch.
     */
    where?: RepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repairs to fetch.
     */
    orderBy?: RepairOrderByWithRelationInput | RepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Repairs.
     */
    cursor?: RepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Repairs.
     */
    distinct?: RepairScalarFieldEnum | RepairScalarFieldEnum[]
  }

  /**
   * Repair findFirstOrThrow
   */
  export type RepairFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * Filter, which Repair to fetch.
     */
    where?: RepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repairs to fetch.
     */
    orderBy?: RepairOrderByWithRelationInput | RepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Repairs.
     */
    cursor?: RepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Repairs.
     */
    distinct?: RepairScalarFieldEnum | RepairScalarFieldEnum[]
  }

  /**
   * Repair findMany
   */
  export type RepairFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * Filter, which Repairs to fetch.
     */
    where?: RepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repairs to fetch.
     */
    orderBy?: RepairOrderByWithRelationInput | RepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Repairs.
     */
    cursor?: RepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repairs.
     */
    skip?: number
    distinct?: RepairScalarFieldEnum | RepairScalarFieldEnum[]
  }

  /**
   * Repair create
   */
  export type RepairCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * The data needed to create a Repair.
     */
    data: XOR<RepairCreateInput, RepairUncheckedCreateInput>
  }

  /**
   * Repair createMany
   */
  export type RepairCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Repairs.
     */
    data: RepairCreateManyInput | RepairCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Repair createManyAndReturn
   */
  export type RepairCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * The data used to create many Repairs.
     */
    data: RepairCreateManyInput | RepairCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Repair update
   */
  export type RepairUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * The data needed to update a Repair.
     */
    data: XOR<RepairUpdateInput, RepairUncheckedUpdateInput>
    /**
     * Choose, which Repair to update.
     */
    where: RepairWhereUniqueInput
  }

  /**
   * Repair updateMany
   */
  export type RepairUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Repairs.
     */
    data: XOR<RepairUpdateManyMutationInput, RepairUncheckedUpdateManyInput>
    /**
     * Filter which Repairs to update
     */
    where?: RepairWhereInput
    /**
     * Limit how many Repairs to update.
     */
    limit?: number
  }

  /**
   * Repair updateManyAndReturn
   */
  export type RepairUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * The data used to update Repairs.
     */
    data: XOR<RepairUpdateManyMutationInput, RepairUncheckedUpdateManyInput>
    /**
     * Filter which Repairs to update
     */
    where?: RepairWhereInput
    /**
     * Limit how many Repairs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Repair upsert
   */
  export type RepairUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * The filter to search for the Repair to update in case it exists.
     */
    where: RepairWhereUniqueInput
    /**
     * In case the Repair found by the `where` argument doesn't exist, create a new Repair with this data.
     */
    create: XOR<RepairCreateInput, RepairUncheckedCreateInput>
    /**
     * In case the Repair was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepairUpdateInput, RepairUncheckedUpdateInput>
  }

  /**
   * Repair delete
   */
  export type RepairDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * Filter which Repair to delete.
     */
    where: RepairWhereUniqueInput
  }

  /**
   * Repair deleteMany
   */
  export type RepairDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Repairs to delete
     */
    where?: RepairWhereInput
    /**
     * Limit how many Repairs to delete.
     */
    limit?: number
  }

  /**
   * Repair.driver
   */
  export type Repair$driverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    where?: DriverWhereInput
  }

  /**
   * Repair.parts
   */
  export type Repair$partsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    where?: PartWhereInput
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    cursor?: PartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Repair without action
   */
  export type RepairDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repair
     */
    omit?: RepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairInclude<ExtArgs> | null
  }


  /**
   * Model Tire
   */

  export type AggregateTire = {
    _count: TireCountAggregateOutputType | null
    _avg: TireAvgAggregateOutputType | null
    _sum: TireSumAggregateOutputType | null
    _min: TireMinAggregateOutputType | null
    _max: TireMaxAggregateOutputType | null
  }

  export type TireAvgAggregateOutputType = {
    fittedOdometerKm: number | null
    removedOdometerKm: number | null
    kmCovered: number | null
    treadDepthMm: number | null
    treadDepthAtRemoval: number | null
    expectedLifeKm: number | null
    unitCost: number | null
  }

  export type TireSumAggregateOutputType = {
    fittedOdometerKm: number | null
    removedOdometerKm: number | null
    kmCovered: number | null
    treadDepthMm: number | null
    treadDepthAtRemoval: number | null
    expectedLifeKm: number | null
    unitCost: number | null
  }

  export type TireMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    brand: string | null
    size: string | null
    serialNumber: string | null
    position: $Enums.TirePosition | null
    status: $Enums.TireStatus | null
    fittedOdometerKm: number | null
    removedOdometerKm: number | null
    kmCovered: number | null
    treadDepthMm: number | null
    treadDepthAtRemoval: number | null
    expectedLifeKm: number | null
    unitCost: number | null
    supplier: string | null
    purchaseDate: Date | null
    fittedDate: Date | null
    removedDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type TireMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    brand: string | null
    size: string | null
    serialNumber: string | null
    position: $Enums.TirePosition | null
    status: $Enums.TireStatus | null
    fittedOdometerKm: number | null
    removedOdometerKm: number | null
    kmCovered: number | null
    treadDepthMm: number | null
    treadDepthAtRemoval: number | null
    expectedLifeKm: number | null
    unitCost: number | null
    supplier: string | null
    purchaseDate: Date | null
    fittedDate: Date | null
    removedDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type TireCountAggregateOutputType = {
    id: number
    vehicleId: number
    brand: number
    size: number
    serialNumber: number
    position: number
    status: number
    fittedOdometerKm: number
    removedOdometerKm: number
    kmCovered: number
    treadDepthMm: number
    treadDepthAtRemoval: number
    expectedLifeKm: number
    unitCost: number
    supplier: number
    purchaseDate: number
    fittedDate: number
    removedDate: number
    notes: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type TireAvgAggregateInputType = {
    fittedOdometerKm?: true
    removedOdometerKm?: true
    kmCovered?: true
    treadDepthMm?: true
    treadDepthAtRemoval?: true
    expectedLifeKm?: true
    unitCost?: true
  }

  export type TireSumAggregateInputType = {
    fittedOdometerKm?: true
    removedOdometerKm?: true
    kmCovered?: true
    treadDepthMm?: true
    treadDepthAtRemoval?: true
    expectedLifeKm?: true
    unitCost?: true
  }

  export type TireMinAggregateInputType = {
    id?: true
    vehicleId?: true
    brand?: true
    size?: true
    serialNumber?: true
    position?: true
    status?: true
    fittedOdometerKm?: true
    removedOdometerKm?: true
    kmCovered?: true
    treadDepthMm?: true
    treadDepthAtRemoval?: true
    expectedLifeKm?: true
    unitCost?: true
    supplier?: true
    purchaseDate?: true
    fittedDate?: true
    removedDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type TireMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    brand?: true
    size?: true
    serialNumber?: true
    position?: true
    status?: true
    fittedOdometerKm?: true
    removedOdometerKm?: true
    kmCovered?: true
    treadDepthMm?: true
    treadDepthAtRemoval?: true
    expectedLifeKm?: true
    unitCost?: true
    supplier?: true
    purchaseDate?: true
    fittedDate?: true
    removedDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type TireCountAggregateInputType = {
    id?: true
    vehicleId?: true
    brand?: true
    size?: true
    serialNumber?: true
    position?: true
    status?: true
    fittedOdometerKm?: true
    removedOdometerKm?: true
    kmCovered?: true
    treadDepthMm?: true
    treadDepthAtRemoval?: true
    expectedLifeKm?: true
    unitCost?: true
    supplier?: true
    purchaseDate?: true
    fittedDate?: true
    removedDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type TireAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tire to aggregate.
     */
    where?: TireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tires to fetch.
     */
    orderBy?: TireOrderByWithRelationInput | TireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tires
    **/
    _count?: true | TireCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TireAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TireSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TireMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TireMaxAggregateInputType
  }

  export type GetTireAggregateType<T extends TireAggregateArgs> = {
        [P in keyof T & keyof AggregateTire]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTire[P]>
      : GetScalarType<T[P], AggregateTire[P]>
  }




  export type TireGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TireWhereInput
    orderBy?: TireOrderByWithAggregationInput | TireOrderByWithAggregationInput[]
    by: TireScalarFieldEnum[] | TireScalarFieldEnum
    having?: TireScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TireCountAggregateInputType | true
    _avg?: TireAvgAggregateInputType
    _sum?: TireSumAggregateInputType
    _min?: TireMinAggregateInputType
    _max?: TireMaxAggregateInputType
  }

  export type TireGroupByOutputType = {
    id: string
    vehicleId: string
    brand: string | null
    size: string | null
    serialNumber: string | null
    position: $Enums.TirePosition
    status: $Enums.TireStatus
    fittedOdometerKm: number | null
    removedOdometerKm: number | null
    kmCovered: number | null
    treadDepthMm: number | null
    treadDepthAtRemoval: number | null
    expectedLifeKm: number | null
    unitCost: number | null
    supplier: string | null
    purchaseDate: Date | null
    fittedDate: Date | null
    removedDate: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: TireCountAggregateOutputType | null
    _avg: TireAvgAggregateOutputType | null
    _sum: TireSumAggregateOutputType | null
    _min: TireMinAggregateOutputType | null
    _max: TireMaxAggregateOutputType | null
  }

  type GetTireGroupByPayload<T extends TireGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TireGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TireGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TireGroupByOutputType[P]>
            : GetScalarType<T[P], TireGroupByOutputType[P]>
        }
      >
    >


  export type TireSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    brand?: boolean
    size?: boolean
    serialNumber?: boolean
    position?: boolean
    status?: boolean
    fittedOdometerKm?: boolean
    removedOdometerKm?: boolean
    kmCovered?: boolean
    treadDepthMm?: boolean
    treadDepthAtRemoval?: boolean
    expectedLifeKm?: boolean
    unitCost?: boolean
    supplier?: boolean
    purchaseDate?: boolean
    fittedDate?: boolean
    removedDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tire"]>

  export type TireSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    brand?: boolean
    size?: boolean
    serialNumber?: boolean
    position?: boolean
    status?: boolean
    fittedOdometerKm?: boolean
    removedOdometerKm?: boolean
    kmCovered?: boolean
    treadDepthMm?: boolean
    treadDepthAtRemoval?: boolean
    expectedLifeKm?: boolean
    unitCost?: boolean
    supplier?: boolean
    purchaseDate?: boolean
    fittedDate?: boolean
    removedDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tire"]>

  export type TireSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    brand?: boolean
    size?: boolean
    serialNumber?: boolean
    position?: boolean
    status?: boolean
    fittedOdometerKm?: boolean
    removedOdometerKm?: boolean
    kmCovered?: boolean
    treadDepthMm?: boolean
    treadDepthAtRemoval?: boolean
    expectedLifeKm?: boolean
    unitCost?: boolean
    supplier?: boolean
    purchaseDate?: boolean
    fittedDate?: boolean
    removedDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tire"]>

  export type TireSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    brand?: boolean
    size?: boolean
    serialNumber?: boolean
    position?: boolean
    status?: boolean
    fittedOdometerKm?: boolean
    removedOdometerKm?: boolean
    kmCovered?: boolean
    treadDepthMm?: boolean
    treadDepthAtRemoval?: boolean
    expectedLifeKm?: boolean
    unitCost?: boolean
    supplier?: boolean
    purchaseDate?: boolean
    fittedDate?: boolean
    removedDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type TireOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vehicleId" | "brand" | "size" | "serialNumber" | "position" | "status" | "fittedOdometerKm" | "removedOdometerKm" | "kmCovered" | "treadDepthMm" | "treadDepthAtRemoval" | "expectedLifeKm" | "unitCost" | "supplier" | "purchaseDate" | "fittedDate" | "removedDate" | "notes" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["tire"]>
  export type TireInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type TireIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type TireIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $TirePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tire"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      brand: string | null
      size: string | null
      serialNumber: string | null
      position: $Enums.TirePosition
      status: $Enums.TireStatus
      fittedOdometerKm: number | null
      removedOdometerKm: number | null
      kmCovered: number | null
      treadDepthMm: number | null
      treadDepthAtRemoval: number | null
      expectedLifeKm: number | null
      unitCost: number | null
      supplier: string | null
      purchaseDate: Date | null
      fittedDate: Date | null
      removedDate: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["tire"]>
    composites: {}
  }

  type TireGetPayload<S extends boolean | null | undefined | TireDefaultArgs> = $Result.GetResult<Prisma.$TirePayload, S>

  type TireCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TireFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TireCountAggregateInputType | true
    }

  export interface TireDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tire'], meta: { name: 'Tire' } }
    /**
     * Find zero or one Tire that matches the filter.
     * @param {TireFindUniqueArgs} args - Arguments to find a Tire
     * @example
     * // Get one Tire
     * const tire = await prisma.tire.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TireFindUniqueArgs>(args: SelectSubset<T, TireFindUniqueArgs<ExtArgs>>): Prisma__TireClient<$Result.GetResult<Prisma.$TirePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tire that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TireFindUniqueOrThrowArgs} args - Arguments to find a Tire
     * @example
     * // Get one Tire
     * const tire = await prisma.tire.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TireFindUniqueOrThrowArgs>(args: SelectSubset<T, TireFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TireClient<$Result.GetResult<Prisma.$TirePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tire that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TireFindFirstArgs} args - Arguments to find a Tire
     * @example
     * // Get one Tire
     * const tire = await prisma.tire.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TireFindFirstArgs>(args?: SelectSubset<T, TireFindFirstArgs<ExtArgs>>): Prisma__TireClient<$Result.GetResult<Prisma.$TirePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tire that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TireFindFirstOrThrowArgs} args - Arguments to find a Tire
     * @example
     * // Get one Tire
     * const tire = await prisma.tire.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TireFindFirstOrThrowArgs>(args?: SelectSubset<T, TireFindFirstOrThrowArgs<ExtArgs>>): Prisma__TireClient<$Result.GetResult<Prisma.$TirePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tires that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TireFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tires
     * const tires = await prisma.tire.findMany()
     * 
     * // Get first 10 Tires
     * const tires = await prisma.tire.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tireWithIdOnly = await prisma.tire.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TireFindManyArgs>(args?: SelectSubset<T, TireFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TirePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tire.
     * @param {TireCreateArgs} args - Arguments to create a Tire.
     * @example
     * // Create one Tire
     * const Tire = await prisma.tire.create({
     *   data: {
     *     // ... data to create a Tire
     *   }
     * })
     * 
     */
    create<T extends TireCreateArgs>(args: SelectSubset<T, TireCreateArgs<ExtArgs>>): Prisma__TireClient<$Result.GetResult<Prisma.$TirePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tires.
     * @param {TireCreateManyArgs} args - Arguments to create many Tires.
     * @example
     * // Create many Tires
     * const tire = await prisma.tire.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TireCreateManyArgs>(args?: SelectSubset<T, TireCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tires and returns the data saved in the database.
     * @param {TireCreateManyAndReturnArgs} args - Arguments to create many Tires.
     * @example
     * // Create many Tires
     * const tire = await prisma.tire.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tires and only return the `id`
     * const tireWithIdOnly = await prisma.tire.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TireCreateManyAndReturnArgs>(args?: SelectSubset<T, TireCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TirePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tire.
     * @param {TireDeleteArgs} args - Arguments to delete one Tire.
     * @example
     * // Delete one Tire
     * const Tire = await prisma.tire.delete({
     *   where: {
     *     // ... filter to delete one Tire
     *   }
     * })
     * 
     */
    delete<T extends TireDeleteArgs>(args: SelectSubset<T, TireDeleteArgs<ExtArgs>>): Prisma__TireClient<$Result.GetResult<Prisma.$TirePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tire.
     * @param {TireUpdateArgs} args - Arguments to update one Tire.
     * @example
     * // Update one Tire
     * const tire = await prisma.tire.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TireUpdateArgs>(args: SelectSubset<T, TireUpdateArgs<ExtArgs>>): Prisma__TireClient<$Result.GetResult<Prisma.$TirePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tires.
     * @param {TireDeleteManyArgs} args - Arguments to filter Tires to delete.
     * @example
     * // Delete a few Tires
     * const { count } = await prisma.tire.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TireDeleteManyArgs>(args?: SelectSubset<T, TireDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tires.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TireUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tires
     * const tire = await prisma.tire.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TireUpdateManyArgs>(args: SelectSubset<T, TireUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tires and returns the data updated in the database.
     * @param {TireUpdateManyAndReturnArgs} args - Arguments to update many Tires.
     * @example
     * // Update many Tires
     * const tire = await prisma.tire.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tires and only return the `id`
     * const tireWithIdOnly = await prisma.tire.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TireUpdateManyAndReturnArgs>(args: SelectSubset<T, TireUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TirePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tire.
     * @param {TireUpsertArgs} args - Arguments to update or create a Tire.
     * @example
     * // Update or create a Tire
     * const tire = await prisma.tire.upsert({
     *   create: {
     *     // ... data to create a Tire
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tire we want to update
     *   }
     * })
     */
    upsert<T extends TireUpsertArgs>(args: SelectSubset<T, TireUpsertArgs<ExtArgs>>): Prisma__TireClient<$Result.GetResult<Prisma.$TirePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tires.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TireCountArgs} args - Arguments to filter Tires to count.
     * @example
     * // Count the number of Tires
     * const count = await prisma.tire.count({
     *   where: {
     *     // ... the filter for the Tires we want to count
     *   }
     * })
    **/
    count<T extends TireCountArgs>(
      args?: Subset<T, TireCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TireCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tire.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TireAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TireAggregateArgs>(args: Subset<T, TireAggregateArgs>): Prisma.PrismaPromise<GetTireAggregateType<T>>

    /**
     * Group by Tire.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TireGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TireGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TireGroupByArgs['orderBy'] }
        : { orderBy?: TireGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TireGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTireGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tire model
   */
  readonly fields: TireFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tire.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TireClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tire model
   */
  interface TireFieldRefs {
    readonly id: FieldRef<"Tire", 'String'>
    readonly vehicleId: FieldRef<"Tire", 'String'>
    readonly brand: FieldRef<"Tire", 'String'>
    readonly size: FieldRef<"Tire", 'String'>
    readonly serialNumber: FieldRef<"Tire", 'String'>
    readonly position: FieldRef<"Tire", 'TirePosition'>
    readonly status: FieldRef<"Tire", 'TireStatus'>
    readonly fittedOdometerKm: FieldRef<"Tire", 'Int'>
    readonly removedOdometerKm: FieldRef<"Tire", 'Int'>
    readonly kmCovered: FieldRef<"Tire", 'Int'>
    readonly treadDepthMm: FieldRef<"Tire", 'Float'>
    readonly treadDepthAtRemoval: FieldRef<"Tire", 'Float'>
    readonly expectedLifeKm: FieldRef<"Tire", 'Int'>
    readonly unitCost: FieldRef<"Tire", 'Float'>
    readonly supplier: FieldRef<"Tire", 'String'>
    readonly purchaseDate: FieldRef<"Tire", 'DateTime'>
    readonly fittedDate: FieldRef<"Tire", 'DateTime'>
    readonly removedDate: FieldRef<"Tire", 'DateTime'>
    readonly notes: FieldRef<"Tire", 'String'>
    readonly createdAt: FieldRef<"Tire", 'DateTime'>
    readonly updatedAt: FieldRef<"Tire", 'DateTime'>
    readonly deletedAt: FieldRef<"Tire", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tire findUnique
   */
  export type TireFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireInclude<ExtArgs> | null
    /**
     * Filter, which Tire to fetch.
     */
    where: TireWhereUniqueInput
  }

  /**
   * Tire findUniqueOrThrow
   */
  export type TireFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireInclude<ExtArgs> | null
    /**
     * Filter, which Tire to fetch.
     */
    where: TireWhereUniqueInput
  }

  /**
   * Tire findFirst
   */
  export type TireFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireInclude<ExtArgs> | null
    /**
     * Filter, which Tire to fetch.
     */
    where?: TireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tires to fetch.
     */
    orderBy?: TireOrderByWithRelationInput | TireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tires.
     */
    cursor?: TireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tires.
     */
    distinct?: TireScalarFieldEnum | TireScalarFieldEnum[]
  }

  /**
   * Tire findFirstOrThrow
   */
  export type TireFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireInclude<ExtArgs> | null
    /**
     * Filter, which Tire to fetch.
     */
    where?: TireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tires to fetch.
     */
    orderBy?: TireOrderByWithRelationInput | TireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tires.
     */
    cursor?: TireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tires.
     */
    distinct?: TireScalarFieldEnum | TireScalarFieldEnum[]
  }

  /**
   * Tire findMany
   */
  export type TireFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireInclude<ExtArgs> | null
    /**
     * Filter, which Tires to fetch.
     */
    where?: TireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tires to fetch.
     */
    orderBy?: TireOrderByWithRelationInput | TireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tires.
     */
    cursor?: TireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tires.
     */
    skip?: number
    distinct?: TireScalarFieldEnum | TireScalarFieldEnum[]
  }

  /**
   * Tire create
   */
  export type TireCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireInclude<ExtArgs> | null
    /**
     * The data needed to create a Tire.
     */
    data: XOR<TireCreateInput, TireUncheckedCreateInput>
  }

  /**
   * Tire createMany
   */
  export type TireCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tires.
     */
    data: TireCreateManyInput | TireCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tire createManyAndReturn
   */
  export type TireCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * The data used to create many Tires.
     */
    data: TireCreateManyInput | TireCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tire update
   */
  export type TireUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireInclude<ExtArgs> | null
    /**
     * The data needed to update a Tire.
     */
    data: XOR<TireUpdateInput, TireUncheckedUpdateInput>
    /**
     * Choose, which Tire to update.
     */
    where: TireWhereUniqueInput
  }

  /**
   * Tire updateMany
   */
  export type TireUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tires.
     */
    data: XOR<TireUpdateManyMutationInput, TireUncheckedUpdateManyInput>
    /**
     * Filter which Tires to update
     */
    where?: TireWhereInput
    /**
     * Limit how many Tires to update.
     */
    limit?: number
  }

  /**
   * Tire updateManyAndReturn
   */
  export type TireUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * The data used to update Tires.
     */
    data: XOR<TireUpdateManyMutationInput, TireUncheckedUpdateManyInput>
    /**
     * Filter which Tires to update
     */
    where?: TireWhereInput
    /**
     * Limit how many Tires to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tire upsert
   */
  export type TireUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireInclude<ExtArgs> | null
    /**
     * The filter to search for the Tire to update in case it exists.
     */
    where: TireWhereUniqueInput
    /**
     * In case the Tire found by the `where` argument doesn't exist, create a new Tire with this data.
     */
    create: XOR<TireCreateInput, TireUncheckedCreateInput>
    /**
     * In case the Tire was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TireUpdateInput, TireUncheckedUpdateInput>
  }

  /**
   * Tire delete
   */
  export type TireDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireInclude<ExtArgs> | null
    /**
     * Filter which Tire to delete.
     */
    where: TireWhereUniqueInput
  }

  /**
   * Tire deleteMany
   */
  export type TireDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tires to delete
     */
    where?: TireWhereInput
    /**
     * Limit how many Tires to delete.
     */
    limit?: number
  }

  /**
   * Tire without action
   */
  export type TireDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tire
     */
    select?: TireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tire
     */
    omit?: TireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TireInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordChangedAt: 'passwordChangedAt',
    name: 'name',
    profileImage: 'profileImage',
    role: 'role',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    hashedToken: 'hashedToken',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const DriverScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    address: 'address',
    profileImage: 'profileImage',
    licenseNo: 'licenseNo',
    licenseExp: 'licenseExp',
    licenseImage: 'licenseImage',
    accountName: 'accountName',
    accountNumber: 'accountNumber',
    bank: 'bank',
    guarantorForm: 'guarantorForm',
    fingerPrint: 'fingerPrint',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type DriverScalarFieldEnum = (typeof DriverScalarFieldEnum)[keyof typeof DriverScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    vin: 'vin',
    plateNumber: 'plateNumber',
    cap_no: 'cap_no',
    make: 'make',
    vehicleImg: 'vehicleImg',
    model: 'model',
    year: 'year',
    fuelType: 'fuelType',
    fuelEfficiencyKmPerUnit: 'fuelEfficiencyKmPerUnit',
    driverId: 'driverId',
    currentOdo: 'currentOdo',
    createdAt: 'createdAt',
    asssignDate: 'asssignDate',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const TruckDriverScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    driverId: 'driverId',
    from: 'from',
    to: 'to',
    createdAt: 'createdAt'
  };

  export type TruckDriverScalarFieldEnum = (typeof TruckDriverScalarFieldEnum)[keyof typeof TruckDriverScalarFieldEnum]


  export const TripScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    driverId: 'driverId',
    loadingPlant: 'loadingPlant',
    waybill_no: 'waybill_no',
    atcNo: 'atcNo',
    company: 'company',
    destination: 'destination',
    despatchDate: 'despatchDate',
    uploadDate: 'uploadDate',
    totaldistanceKm: 'totaldistanceKm',
    odoStart: 'odoStart',
    odoEnd: 'odoEnd',
    totalFuelCost: 'totalFuelCost',
    totalCO2Kg: 'totalCO2Kg',
    costPerKm: 'costPerKm',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TripScalarFieldEnum = (typeof TripScalarFieldEnum)[keyof typeof TripScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    customerName: 'customerName',
    tripId: 'tripId',
    company: 'company',
    noOfBags: 'noOfBags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const FuelScalarFieldEnum: {
    id: 'id',
    type: 'type',
    tripId: 'tripId',
    qtyGiven: 'qtyGiven',
    unit: 'unit',
    unitPrice: 'unitPrice',
    fuelCost: 'fuelCost',
    distanceKm: 'distanceKm',
    estimatedCO2: 'estimatedCO2',
    dieselEquivalentL: 'dieselEquivalentL',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FuelScalarFieldEnum = (typeof FuelScalarFieldEnum)[keyof typeof FuelScalarFieldEnum]


  export const PartScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    repairId: 'repairId',
    name: 'name',
    partNumber: 'partNumber',
    category: 'category',
    quantity: 'quantity',
    unitCost: 'unitCost',
    totalCost: 'totalCost',
    supplier: 'supplier',
    supplierPhone: 'supplierPhone',
    purchaseDate: 'purchaseDate',
    fittedDate: 'fittedDate',
    warrantyExpiry: 'warrantyExpiry',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type PartScalarFieldEnum = (typeof PartScalarFieldEnum)[keyof typeof PartScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    driverId: 'driverId',
    serviceType: 'serviceType',
    status: 'status',
    description: 'description',
    odometerKm: 'odometerKm',
    nextServiceKm: 'nextServiceKm',
    nextServiceDate: 'nextServiceDate',
    laborCost: 'laborCost',
    partsCost: 'partsCost',
    totalCost: 'totalCost',
    garage: 'garage',
    garagePhone: 'garagePhone',
    scheduledDate: 'scheduledDate',
    completedDate: 'completedDate',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const RepairScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    driverId: 'driverId',
    status: 'status',
    priority: 'priority',
    faultDesc: 'faultDesc',
    repairDesc: 'repairDesc',
    odometerKm: 'odometerKm',
    laborCost: 'laborCost',
    partsCost: 'partsCost',
    totalCost: 'totalCost',
    garage: 'garage',
    garagePhone: 'garagePhone',
    reportedDate: 'reportedDate',
    startedDate: 'startedDate',
    completedDate: 'completedDate',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type RepairScalarFieldEnum = (typeof RepairScalarFieldEnum)[keyof typeof RepairScalarFieldEnum]


  export const TireScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    brand: 'brand',
    size: 'size',
    serialNumber: 'serialNumber',
    position: 'position',
    status: 'status',
    fittedOdometerKm: 'fittedOdometerKm',
    removedOdometerKm: 'removedOdometerKm',
    kmCovered: 'kmCovered',
    treadDepthMm: 'treadDepthMm',
    treadDepthAtRemoval: 'treadDepthAtRemoval',
    expectedLifeKm: 'expectedLifeKm',
    unitCost: 'unitCost',
    supplier: 'supplier',
    purchaseDate: 'purchaseDate',
    fittedDate: 'fittedDate',
    removedDate: 'removedDate',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type TireScalarFieldEnum = (typeof TireScalarFieldEnum)[keyof typeof TireScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'FuelType'
   */
  export type EnumFuelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FuelType'>
    


  /**
   * Reference to a field of type 'FuelType[]'
   */
  export type ListEnumFuelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FuelType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'TripStatus'
   */
  export type EnumTripStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripStatus'>
    


  /**
   * Reference to a field of type 'TripStatus[]'
   */
  export type ListEnumTripStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripStatus[]'>
    


  /**
   * Reference to a field of type 'ServiceType'
   */
  export type EnumServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceType'>
    


  /**
   * Reference to a field of type 'ServiceType[]'
   */
  export type ListEnumServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceType[]'>
    


  /**
   * Reference to a field of type 'ServiceStatus'
   */
  export type EnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus'>
    


  /**
   * Reference to a field of type 'ServiceStatus[]'
   */
  export type ListEnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus[]'>
    


  /**
   * Reference to a field of type 'RepairStatus'
   */
  export type EnumRepairStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RepairStatus'>
    


  /**
   * Reference to a field of type 'RepairStatus[]'
   */
  export type ListEnumRepairStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RepairStatus[]'>
    


  /**
   * Reference to a field of type 'RepairPriority'
   */
  export type EnumRepairPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RepairPriority'>
    


  /**
   * Reference to a field of type 'RepairPriority[]'
   */
  export type ListEnumRepairPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RepairPriority[]'>
    


  /**
   * Reference to a field of type 'TirePosition'
   */
  export type EnumTirePositionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TirePosition'>
    


  /**
   * Reference to a field of type 'TirePosition[]'
   */
  export type ListEnumTirePositionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TirePosition[]'>
    


  /**
   * Reference to a field of type 'TireStatus'
   */
  export type EnumTireStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TireStatus'>
    


  /**
   * Reference to a field of type 'TireStatus[]'
   */
  export type ListEnumTireStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TireStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordChangedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    name?: StringNullableFilter<"User"> | string | null
    profileImage?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordReset?: XOR<PasswordResetTokenNullableScalarRelationFilter, PasswordResetTokenWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordChangedAt?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    profileImage?: SortOrder
    role?: SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    passwordReset?: PasswordResetTokenOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordChangedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    name?: StringNullableFilter<"User"> | string | null
    profileImage?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordReset?: XOR<PasswordResetTokenNullableScalarRelationFilter, PasswordResetTokenWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordChangedAt?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    profileImage?: SortOrder
    role?: SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordChangedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    profileImage?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    hashedToken?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    hashedToken?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    hashedToken?: string
    userId?: string
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "hashedToken" | "userId">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    hashedToken?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    hashedToken?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    userId?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type DriverWhereInput = {
    AND?: DriverWhereInput | DriverWhereInput[]
    OR?: DriverWhereInput[]
    NOT?: DriverWhereInput | DriverWhereInput[]
    id?: StringFilter<"Driver"> | string
    name?: StringFilter<"Driver"> | string
    phone?: StringNullableFilter<"Driver"> | string | null
    address?: StringFilter<"Driver"> | string
    profileImage?: StringFilter<"Driver"> | string
    licenseNo?: StringNullableFilter<"Driver"> | string | null
    licenseExp?: DateTimeNullableFilter<"Driver"> | Date | string | null
    licenseImage?: StringFilter<"Driver"> | string
    accountName?: StringFilter<"Driver"> | string
    accountNumber?: StringFilter<"Driver"> | string
    bank?: StringFilter<"Driver"> | string
    guarantorForm?: StringFilter<"Driver"> | string
    fingerPrint?: StringFilter<"Driver"> | string
    notes?: StringNullableFilter<"Driver"> | string | null
    createdAt?: DateTimeFilter<"Driver"> | Date | string
    updatedAt?: DateTimeFilter<"Driver"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Driver"> | Date | string | null
    vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
    trips?: TripListRelationFilter
    services?: ServiceListRelationFilter
    repairs?: RepairListRelationFilter
    truckDriver?: TruckDriverListRelationFilter
  }

  export type DriverOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrder
    profileImage?: SortOrder
    licenseNo?: SortOrderInput | SortOrder
    licenseExp?: SortOrderInput | SortOrder
    licenseImage?: SortOrder
    accountName?: SortOrder
    accountNumber?: SortOrder
    bank?: SortOrder
    guarantorForm?: SortOrder
    fingerPrint?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    vehicle?: VehicleOrderByWithRelationInput
    trips?: TripOrderByRelationAggregateInput
    services?: ServiceOrderByRelationAggregateInput
    repairs?: RepairOrderByRelationAggregateInput
    truckDriver?: TruckDriverOrderByRelationAggregateInput
  }

  export type DriverWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    licenseNo?: string
    AND?: DriverWhereInput | DriverWhereInput[]
    OR?: DriverWhereInput[]
    NOT?: DriverWhereInput | DriverWhereInput[]
    name?: StringFilter<"Driver"> | string
    phone?: StringNullableFilter<"Driver"> | string | null
    address?: StringFilter<"Driver"> | string
    profileImage?: StringFilter<"Driver"> | string
    licenseExp?: DateTimeNullableFilter<"Driver"> | Date | string | null
    licenseImage?: StringFilter<"Driver"> | string
    accountName?: StringFilter<"Driver"> | string
    accountNumber?: StringFilter<"Driver"> | string
    bank?: StringFilter<"Driver"> | string
    guarantorForm?: StringFilter<"Driver"> | string
    fingerPrint?: StringFilter<"Driver"> | string
    notes?: StringNullableFilter<"Driver"> | string | null
    createdAt?: DateTimeFilter<"Driver"> | Date | string
    updatedAt?: DateTimeFilter<"Driver"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Driver"> | Date | string | null
    vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
    trips?: TripListRelationFilter
    services?: ServiceListRelationFilter
    repairs?: RepairListRelationFilter
    truckDriver?: TruckDriverListRelationFilter
  }, "id" | "licenseNo">

  export type DriverOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrder
    profileImage?: SortOrder
    licenseNo?: SortOrderInput | SortOrder
    licenseExp?: SortOrderInput | SortOrder
    licenseImage?: SortOrder
    accountName?: SortOrder
    accountNumber?: SortOrder
    bank?: SortOrder
    guarantorForm?: SortOrder
    fingerPrint?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: DriverCountOrderByAggregateInput
    _max?: DriverMaxOrderByAggregateInput
    _min?: DriverMinOrderByAggregateInput
  }

  export type DriverScalarWhereWithAggregatesInput = {
    AND?: DriverScalarWhereWithAggregatesInput | DriverScalarWhereWithAggregatesInput[]
    OR?: DriverScalarWhereWithAggregatesInput[]
    NOT?: DriverScalarWhereWithAggregatesInput | DriverScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Driver"> | string
    name?: StringWithAggregatesFilter<"Driver"> | string
    phone?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    address?: StringWithAggregatesFilter<"Driver"> | string
    profileImage?: StringWithAggregatesFilter<"Driver"> | string
    licenseNo?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    licenseExp?: DateTimeNullableWithAggregatesFilter<"Driver"> | Date | string | null
    licenseImage?: StringWithAggregatesFilter<"Driver"> | string
    accountName?: StringWithAggregatesFilter<"Driver"> | string
    accountNumber?: StringWithAggregatesFilter<"Driver"> | string
    bank?: StringWithAggregatesFilter<"Driver"> | string
    guarantorForm?: StringWithAggregatesFilter<"Driver"> | string
    fingerPrint?: StringWithAggregatesFilter<"Driver"> | string
    notes?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Driver"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Driver"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Driver"> | Date | string | null
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    vin?: StringNullableFilter<"Vehicle"> | string | null
    plateNumber?: StringFilter<"Vehicle"> | string
    cap_no?: StringFilter<"Vehicle"> | string
    make?: StringNullableFilter<"Vehicle"> | string | null
    vehicleImg?: StringNullableFilter<"Vehicle"> | string | null
    model?: StringNullableFilter<"Vehicle"> | string | null
    year?: IntNullableFilter<"Vehicle"> | number | null
    fuelType?: EnumFuelTypeFilter<"Vehicle"> | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: FloatNullableFilter<"Vehicle"> | number | null
    driverId?: StringNullableFilter<"Vehicle"> | string | null
    currentOdo?: IntNullableFilter<"Vehicle"> | number | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    asssignDate?: DateTimeNullableFilter<"Vehicle"> | Date | string | null
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Vehicle"> | Date | string | null
    driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
    trips?: TripListRelationFilter
    truckDriver?: TruckDriverListRelationFilter
    services?: ServiceListRelationFilter
    repairs?: RepairListRelationFilter
    parts?: PartListRelationFilter
    tires?: TireListRelationFilter
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    vin?: SortOrderInput | SortOrder
    plateNumber?: SortOrder
    cap_no?: SortOrder
    make?: SortOrderInput | SortOrder
    vehicleImg?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    fuelType?: SortOrder
    fuelEfficiencyKmPerUnit?: SortOrderInput | SortOrder
    driverId?: SortOrderInput | SortOrder
    currentOdo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    asssignDate?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    driver?: DriverOrderByWithRelationInput
    trips?: TripOrderByRelationAggregateInput
    truckDriver?: TruckDriverOrderByRelationAggregateInput
    services?: ServiceOrderByRelationAggregateInput
    repairs?: RepairOrderByRelationAggregateInput
    parts?: PartOrderByRelationAggregateInput
    tires?: TireOrderByRelationAggregateInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    vin?: string
    plateNumber?: string
    cap_no?: string
    driverId?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    make?: StringNullableFilter<"Vehicle"> | string | null
    vehicleImg?: StringNullableFilter<"Vehicle"> | string | null
    model?: StringNullableFilter<"Vehicle"> | string | null
    year?: IntNullableFilter<"Vehicle"> | number | null
    fuelType?: EnumFuelTypeFilter<"Vehicle"> | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: FloatNullableFilter<"Vehicle"> | number | null
    currentOdo?: IntNullableFilter<"Vehicle"> | number | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    asssignDate?: DateTimeNullableFilter<"Vehicle"> | Date | string | null
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Vehicle"> | Date | string | null
    driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
    trips?: TripListRelationFilter
    truckDriver?: TruckDriverListRelationFilter
    services?: ServiceListRelationFilter
    repairs?: RepairListRelationFilter
    parts?: PartListRelationFilter
    tires?: TireListRelationFilter
  }, "id" | "vin" | "plateNumber" | "cap_no" | "driverId">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    vin?: SortOrderInput | SortOrder
    plateNumber?: SortOrder
    cap_no?: SortOrder
    make?: SortOrderInput | SortOrder
    vehicleImg?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    fuelType?: SortOrder
    fuelEfficiencyKmPerUnit?: SortOrderInput | SortOrder
    driverId?: SortOrderInput | SortOrder
    currentOdo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    asssignDate?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    vin?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    plateNumber?: StringWithAggregatesFilter<"Vehicle"> | string
    cap_no?: StringWithAggregatesFilter<"Vehicle"> | string
    make?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    vehicleImg?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    model?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    year?: IntNullableWithAggregatesFilter<"Vehicle"> | number | null
    fuelType?: EnumFuelTypeWithAggregatesFilter<"Vehicle"> | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: FloatNullableWithAggregatesFilter<"Vehicle"> | number | null
    driverId?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    currentOdo?: IntNullableWithAggregatesFilter<"Vehicle"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    asssignDate?: DateTimeNullableWithAggregatesFilter<"Vehicle"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Vehicle"> | Date | string | null
  }

  export type TruckDriverWhereInput = {
    AND?: TruckDriverWhereInput | TruckDriverWhereInput[]
    OR?: TruckDriverWhereInput[]
    NOT?: TruckDriverWhereInput | TruckDriverWhereInput[]
    id?: StringFilter<"TruckDriver"> | string
    vehicleId?: StringFilter<"TruckDriver"> | string
    driverId?: StringFilter<"TruckDriver"> | string
    from?: DateTimeNullableFilter<"TruckDriver"> | Date | string | null
    to?: DateTimeNullableFilter<"TruckDriver"> | Date | string | null
    createdAt?: DateTimeFilter<"TruckDriver"> | Date | string
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
  }

  export type TruckDriverOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    from?: SortOrderInput | SortOrder
    to?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    vehicle?: VehicleOrderByWithRelationInput
    driver?: DriverOrderByWithRelationInput
  }

  export type TruckDriverWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TruckDriverWhereInput | TruckDriverWhereInput[]
    OR?: TruckDriverWhereInput[]
    NOT?: TruckDriverWhereInput | TruckDriverWhereInput[]
    vehicleId?: StringFilter<"TruckDriver"> | string
    driverId?: StringFilter<"TruckDriver"> | string
    from?: DateTimeNullableFilter<"TruckDriver"> | Date | string | null
    to?: DateTimeNullableFilter<"TruckDriver"> | Date | string | null
    createdAt?: DateTimeFilter<"TruckDriver"> | Date | string
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
  }, "id">

  export type TruckDriverOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    from?: SortOrderInput | SortOrder
    to?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TruckDriverCountOrderByAggregateInput
    _max?: TruckDriverMaxOrderByAggregateInput
    _min?: TruckDriverMinOrderByAggregateInput
  }

  export type TruckDriverScalarWhereWithAggregatesInput = {
    AND?: TruckDriverScalarWhereWithAggregatesInput | TruckDriverScalarWhereWithAggregatesInput[]
    OR?: TruckDriverScalarWhereWithAggregatesInput[]
    NOT?: TruckDriverScalarWhereWithAggregatesInput | TruckDriverScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TruckDriver"> | string
    vehicleId?: StringWithAggregatesFilter<"TruckDriver"> | string
    driverId?: StringWithAggregatesFilter<"TruckDriver"> | string
    from?: DateTimeNullableWithAggregatesFilter<"TruckDriver"> | Date | string | null
    to?: DateTimeNullableWithAggregatesFilter<"TruckDriver"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TruckDriver"> | Date | string
  }

  export type TripWhereInput = {
    AND?: TripWhereInput | TripWhereInput[]
    OR?: TripWhereInput[]
    NOT?: TripWhereInput | TripWhereInput[]
    id?: StringFilter<"Trip"> | string
    vehicleId?: StringFilter<"Trip"> | string
    driverId?: StringFilter<"Trip"> | string
    loadingPlant?: StringFilter<"Trip"> | string
    waybill_no?: StringFilter<"Trip"> | string
    atcNo?: StringFilter<"Trip"> | string
    company?: StringNullableFilter<"Trip"> | string | null
    destination?: StringFilter<"Trip"> | string
    despatchDate?: DateTimeFilter<"Trip"> | Date | string
    uploadDate?: DateTimeFilter<"Trip"> | Date | string
    totaldistanceKm?: FloatNullableFilter<"Trip"> | number | null
    odoStart?: IntNullableFilter<"Trip"> | number | null
    odoEnd?: IntNullableFilter<"Trip"> | number | null
    totalFuelCost?: FloatNullableFilter<"Trip"> | number | null
    totalCO2Kg?: FloatNullableFilter<"Trip"> | number | null
    costPerKm?: FloatNullableFilter<"Trip"> | number | null
    status?: EnumTripStatusFilter<"Trip"> | $Enums.TripStatus
    notes?: StringNullableFilter<"Trip"> | string | null
    createdAt?: DateTimeFilter<"Trip"> | Date | string
    updatedAt?: DateTimeFilter<"Trip"> | Date | string
    customer?: CustomerListRelationFilter
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
    fuels?: FuelListRelationFilter
  }

  export type TripOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    loadingPlant?: SortOrder
    waybill_no?: SortOrder
    atcNo?: SortOrder
    company?: SortOrderInput | SortOrder
    destination?: SortOrder
    despatchDate?: SortOrder
    uploadDate?: SortOrder
    totaldistanceKm?: SortOrderInput | SortOrder
    odoStart?: SortOrderInput | SortOrder
    odoEnd?: SortOrderInput | SortOrder
    totalFuelCost?: SortOrderInput | SortOrder
    totalCO2Kg?: SortOrderInput | SortOrder
    costPerKm?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByRelationAggregateInput
    vehicle?: VehicleOrderByWithRelationInput
    driver?: DriverOrderByWithRelationInput
    fuels?: FuelOrderByRelationAggregateInput
  }

  export type TripWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    waybill_no?: string
    atcNo?: string
    AND?: TripWhereInput | TripWhereInput[]
    OR?: TripWhereInput[]
    NOT?: TripWhereInput | TripWhereInput[]
    vehicleId?: StringFilter<"Trip"> | string
    driverId?: StringFilter<"Trip"> | string
    loadingPlant?: StringFilter<"Trip"> | string
    company?: StringNullableFilter<"Trip"> | string | null
    destination?: StringFilter<"Trip"> | string
    despatchDate?: DateTimeFilter<"Trip"> | Date | string
    uploadDate?: DateTimeFilter<"Trip"> | Date | string
    totaldistanceKm?: FloatNullableFilter<"Trip"> | number | null
    odoStart?: IntNullableFilter<"Trip"> | number | null
    odoEnd?: IntNullableFilter<"Trip"> | number | null
    totalFuelCost?: FloatNullableFilter<"Trip"> | number | null
    totalCO2Kg?: FloatNullableFilter<"Trip"> | number | null
    costPerKm?: FloatNullableFilter<"Trip"> | number | null
    status?: EnumTripStatusFilter<"Trip"> | $Enums.TripStatus
    notes?: StringNullableFilter<"Trip"> | string | null
    createdAt?: DateTimeFilter<"Trip"> | Date | string
    updatedAt?: DateTimeFilter<"Trip"> | Date | string
    customer?: CustomerListRelationFilter
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
    fuels?: FuelListRelationFilter
  }, "id" | "waybill_no" | "atcNo">

  export type TripOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    loadingPlant?: SortOrder
    waybill_no?: SortOrder
    atcNo?: SortOrder
    company?: SortOrderInput | SortOrder
    destination?: SortOrder
    despatchDate?: SortOrder
    uploadDate?: SortOrder
    totaldistanceKm?: SortOrderInput | SortOrder
    odoStart?: SortOrderInput | SortOrder
    odoEnd?: SortOrderInput | SortOrder
    totalFuelCost?: SortOrderInput | SortOrder
    totalCO2Kg?: SortOrderInput | SortOrder
    costPerKm?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TripCountOrderByAggregateInput
    _avg?: TripAvgOrderByAggregateInput
    _max?: TripMaxOrderByAggregateInput
    _min?: TripMinOrderByAggregateInput
    _sum?: TripSumOrderByAggregateInput
  }

  export type TripScalarWhereWithAggregatesInput = {
    AND?: TripScalarWhereWithAggregatesInput | TripScalarWhereWithAggregatesInput[]
    OR?: TripScalarWhereWithAggregatesInput[]
    NOT?: TripScalarWhereWithAggregatesInput | TripScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Trip"> | string
    vehicleId?: StringWithAggregatesFilter<"Trip"> | string
    driverId?: StringWithAggregatesFilter<"Trip"> | string
    loadingPlant?: StringWithAggregatesFilter<"Trip"> | string
    waybill_no?: StringWithAggregatesFilter<"Trip"> | string
    atcNo?: StringWithAggregatesFilter<"Trip"> | string
    company?: StringNullableWithAggregatesFilter<"Trip"> | string | null
    destination?: StringWithAggregatesFilter<"Trip"> | string
    despatchDate?: DateTimeWithAggregatesFilter<"Trip"> | Date | string
    uploadDate?: DateTimeWithAggregatesFilter<"Trip"> | Date | string
    totaldistanceKm?: FloatNullableWithAggregatesFilter<"Trip"> | number | null
    odoStart?: IntNullableWithAggregatesFilter<"Trip"> | number | null
    odoEnd?: IntNullableWithAggregatesFilter<"Trip"> | number | null
    totalFuelCost?: FloatNullableWithAggregatesFilter<"Trip"> | number | null
    totalCO2Kg?: FloatNullableWithAggregatesFilter<"Trip"> | number | null
    costPerKm?: FloatNullableWithAggregatesFilter<"Trip"> | number | null
    status?: EnumTripStatusWithAggregatesFilter<"Trip"> | $Enums.TripStatus
    notes?: StringNullableWithAggregatesFilter<"Trip"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Trip"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Trip"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    customerName?: StringFilter<"Customer"> | string
    tripId?: StringFilter<"Customer"> | string
    company?: StringFilter<"Customer"> | string
    noOfBags?: IntNullableFilter<"Customer"> | number | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    customerName?: SortOrder
    tripId?: SortOrder
    company?: SortOrder
    noOfBags?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trip?: TripOrderByWithRelationInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    customerName?: StringFilter<"Customer"> | string
    tripId?: StringFilter<"Customer"> | string
    company?: StringFilter<"Customer"> | string
    noOfBags?: IntNullableFilter<"Customer"> | number | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
  }, "id">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    customerName?: SortOrder
    tripId?: SortOrder
    company?: SortOrder
    noOfBags?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    customerName?: StringWithAggregatesFilter<"Customer"> | string
    tripId?: StringWithAggregatesFilter<"Customer"> | string
    company?: StringWithAggregatesFilter<"Customer"> | string
    noOfBags?: IntNullableWithAggregatesFilter<"Customer"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type FuelWhereInput = {
    AND?: FuelWhereInput | FuelWhereInput[]
    OR?: FuelWhereInput[]
    NOT?: FuelWhereInput | FuelWhereInput[]
    id?: StringFilter<"Fuel"> | string
    type?: EnumFuelTypeFilter<"Fuel"> | $Enums.FuelType
    tripId?: StringFilter<"Fuel"> | string
    qtyGiven?: FloatFilter<"Fuel"> | number
    unit?: StringFilter<"Fuel"> | string
    unitPrice?: FloatNullableFilter<"Fuel"> | number | null
    fuelCost?: FloatNullableFilter<"Fuel"> | number | null
    distanceKm?: FloatNullableFilter<"Fuel"> | number | null
    estimatedCO2?: FloatNullableFilter<"Fuel"> | number | null
    dieselEquivalentL?: FloatNullableFilter<"Fuel"> | number | null
    createdAt?: DateTimeFilter<"Fuel"> | Date | string
    updatedAt?: DateTimeFilter<"Fuel"> | Date | string
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
  }

  export type FuelOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    tripId?: SortOrder
    qtyGiven?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrderInput | SortOrder
    fuelCost?: SortOrderInput | SortOrder
    distanceKm?: SortOrderInput | SortOrder
    estimatedCO2?: SortOrderInput | SortOrder
    dieselEquivalentL?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trip?: TripOrderByWithRelationInput
  }

  export type FuelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FuelWhereInput | FuelWhereInput[]
    OR?: FuelWhereInput[]
    NOT?: FuelWhereInput | FuelWhereInput[]
    type?: EnumFuelTypeFilter<"Fuel"> | $Enums.FuelType
    tripId?: StringFilter<"Fuel"> | string
    qtyGiven?: FloatFilter<"Fuel"> | number
    unit?: StringFilter<"Fuel"> | string
    unitPrice?: FloatNullableFilter<"Fuel"> | number | null
    fuelCost?: FloatNullableFilter<"Fuel"> | number | null
    distanceKm?: FloatNullableFilter<"Fuel"> | number | null
    estimatedCO2?: FloatNullableFilter<"Fuel"> | number | null
    dieselEquivalentL?: FloatNullableFilter<"Fuel"> | number | null
    createdAt?: DateTimeFilter<"Fuel"> | Date | string
    updatedAt?: DateTimeFilter<"Fuel"> | Date | string
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
  }, "id">

  export type FuelOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    tripId?: SortOrder
    qtyGiven?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrderInput | SortOrder
    fuelCost?: SortOrderInput | SortOrder
    distanceKm?: SortOrderInput | SortOrder
    estimatedCO2?: SortOrderInput | SortOrder
    dieselEquivalentL?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FuelCountOrderByAggregateInput
    _avg?: FuelAvgOrderByAggregateInput
    _max?: FuelMaxOrderByAggregateInput
    _min?: FuelMinOrderByAggregateInput
    _sum?: FuelSumOrderByAggregateInput
  }

  export type FuelScalarWhereWithAggregatesInput = {
    AND?: FuelScalarWhereWithAggregatesInput | FuelScalarWhereWithAggregatesInput[]
    OR?: FuelScalarWhereWithAggregatesInput[]
    NOT?: FuelScalarWhereWithAggregatesInput | FuelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Fuel"> | string
    type?: EnumFuelTypeWithAggregatesFilter<"Fuel"> | $Enums.FuelType
    tripId?: StringWithAggregatesFilter<"Fuel"> | string
    qtyGiven?: FloatWithAggregatesFilter<"Fuel"> | number
    unit?: StringWithAggregatesFilter<"Fuel"> | string
    unitPrice?: FloatNullableWithAggregatesFilter<"Fuel"> | number | null
    fuelCost?: FloatNullableWithAggregatesFilter<"Fuel"> | number | null
    distanceKm?: FloatNullableWithAggregatesFilter<"Fuel"> | number | null
    estimatedCO2?: FloatNullableWithAggregatesFilter<"Fuel"> | number | null
    dieselEquivalentL?: FloatNullableWithAggregatesFilter<"Fuel"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Fuel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Fuel"> | Date | string
  }

  export type PartWhereInput = {
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    id?: StringFilter<"Part"> | string
    vehicleId?: StringFilter<"Part"> | string
    repairId?: StringNullableFilter<"Part"> | string | null
    name?: StringFilter<"Part"> | string
    partNumber?: StringNullableFilter<"Part"> | string | null
    category?: StringNullableFilter<"Part"> | string | null
    quantity?: IntFilter<"Part"> | number
    unitCost?: FloatFilter<"Part"> | number
    totalCost?: FloatFilter<"Part"> | number
    supplier?: StringNullableFilter<"Part"> | string | null
    supplierPhone?: StringNullableFilter<"Part"> | string | null
    purchaseDate?: DateTimeNullableFilter<"Part"> | Date | string | null
    fittedDate?: DateTimeNullableFilter<"Part"> | Date | string | null
    warrantyExpiry?: DateTimeNullableFilter<"Part"> | Date | string | null
    notes?: StringNullableFilter<"Part"> | string | null
    createdAt?: DateTimeFilter<"Part"> | Date | string
    updatedAt?: DateTimeFilter<"Part"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Part"> | Date | string | null
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    repair?: XOR<RepairNullableScalarRelationFilter, RepairWhereInput> | null
  }

  export type PartOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    repairId?: SortOrderInput | SortOrder
    name?: SortOrder
    partNumber?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    quantity?: SortOrder
    unitCost?: SortOrder
    totalCost?: SortOrder
    supplier?: SortOrderInput | SortOrder
    supplierPhone?: SortOrderInput | SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    fittedDate?: SortOrderInput | SortOrder
    warrantyExpiry?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    vehicle?: VehicleOrderByWithRelationInput
    repair?: RepairOrderByWithRelationInput
  }

  export type PartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    vehicleId?: StringFilter<"Part"> | string
    repairId?: StringNullableFilter<"Part"> | string | null
    name?: StringFilter<"Part"> | string
    partNumber?: StringNullableFilter<"Part"> | string | null
    category?: StringNullableFilter<"Part"> | string | null
    quantity?: IntFilter<"Part"> | number
    unitCost?: FloatFilter<"Part"> | number
    totalCost?: FloatFilter<"Part"> | number
    supplier?: StringNullableFilter<"Part"> | string | null
    supplierPhone?: StringNullableFilter<"Part"> | string | null
    purchaseDate?: DateTimeNullableFilter<"Part"> | Date | string | null
    fittedDate?: DateTimeNullableFilter<"Part"> | Date | string | null
    warrantyExpiry?: DateTimeNullableFilter<"Part"> | Date | string | null
    notes?: StringNullableFilter<"Part"> | string | null
    createdAt?: DateTimeFilter<"Part"> | Date | string
    updatedAt?: DateTimeFilter<"Part"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Part"> | Date | string | null
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    repair?: XOR<RepairNullableScalarRelationFilter, RepairWhereInput> | null
  }, "id">

  export type PartOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    repairId?: SortOrderInput | SortOrder
    name?: SortOrder
    partNumber?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    quantity?: SortOrder
    unitCost?: SortOrder
    totalCost?: SortOrder
    supplier?: SortOrderInput | SortOrder
    supplierPhone?: SortOrderInput | SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    fittedDate?: SortOrderInput | SortOrder
    warrantyExpiry?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: PartCountOrderByAggregateInput
    _avg?: PartAvgOrderByAggregateInput
    _max?: PartMaxOrderByAggregateInput
    _min?: PartMinOrderByAggregateInput
    _sum?: PartSumOrderByAggregateInput
  }

  export type PartScalarWhereWithAggregatesInput = {
    AND?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    OR?: PartScalarWhereWithAggregatesInput[]
    NOT?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Part"> | string
    vehicleId?: StringWithAggregatesFilter<"Part"> | string
    repairId?: StringNullableWithAggregatesFilter<"Part"> | string | null
    name?: StringWithAggregatesFilter<"Part"> | string
    partNumber?: StringNullableWithAggregatesFilter<"Part"> | string | null
    category?: StringNullableWithAggregatesFilter<"Part"> | string | null
    quantity?: IntWithAggregatesFilter<"Part"> | number
    unitCost?: FloatWithAggregatesFilter<"Part"> | number
    totalCost?: FloatWithAggregatesFilter<"Part"> | number
    supplier?: StringNullableWithAggregatesFilter<"Part"> | string | null
    supplierPhone?: StringNullableWithAggregatesFilter<"Part"> | string | null
    purchaseDate?: DateTimeNullableWithAggregatesFilter<"Part"> | Date | string | null
    fittedDate?: DateTimeNullableWithAggregatesFilter<"Part"> | Date | string | null
    warrantyExpiry?: DateTimeNullableWithAggregatesFilter<"Part"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"Part"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Part"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Part"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Part"> | Date | string | null
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    vehicleId?: StringFilter<"Service"> | string
    driverId?: StringNullableFilter<"Service"> | string | null
    serviceType?: EnumServiceTypeFilter<"Service"> | $Enums.ServiceType
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    description?: StringNullableFilter<"Service"> | string | null
    odometerKm?: IntNullableFilter<"Service"> | number | null
    nextServiceKm?: IntNullableFilter<"Service"> | number | null
    nextServiceDate?: DateTimeNullableFilter<"Service"> | Date | string | null
    laborCost?: FloatNullableFilter<"Service"> | number | null
    partsCost?: FloatNullableFilter<"Service"> | number | null
    totalCost?: FloatNullableFilter<"Service"> | number | null
    garage?: StringNullableFilter<"Service"> | string | null
    garagePhone?: StringNullableFilter<"Service"> | string | null
    scheduledDate?: DateTimeNullableFilter<"Service"> | Date | string | null
    completedDate?: DateTimeNullableFilter<"Service"> | Date | string | null
    notes?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Service"> | Date | string | null
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrderInput | SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    odometerKm?: SortOrderInput | SortOrder
    nextServiceKm?: SortOrderInput | SortOrder
    nextServiceDate?: SortOrderInput | SortOrder
    laborCost?: SortOrderInput | SortOrder
    partsCost?: SortOrderInput | SortOrder
    totalCost?: SortOrderInput | SortOrder
    garage?: SortOrderInput | SortOrder
    garagePhone?: SortOrderInput | SortOrder
    scheduledDate?: SortOrderInput | SortOrder
    completedDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    vehicle?: VehicleOrderByWithRelationInput
    driver?: DriverOrderByWithRelationInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    vehicleId?: StringFilter<"Service"> | string
    driverId?: StringNullableFilter<"Service"> | string | null
    serviceType?: EnumServiceTypeFilter<"Service"> | $Enums.ServiceType
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    description?: StringNullableFilter<"Service"> | string | null
    odometerKm?: IntNullableFilter<"Service"> | number | null
    nextServiceKm?: IntNullableFilter<"Service"> | number | null
    nextServiceDate?: DateTimeNullableFilter<"Service"> | Date | string | null
    laborCost?: FloatNullableFilter<"Service"> | number | null
    partsCost?: FloatNullableFilter<"Service"> | number | null
    totalCost?: FloatNullableFilter<"Service"> | number | null
    garage?: StringNullableFilter<"Service"> | string | null
    garagePhone?: StringNullableFilter<"Service"> | string | null
    scheduledDate?: DateTimeNullableFilter<"Service"> | Date | string | null
    completedDate?: DateTimeNullableFilter<"Service"> | Date | string | null
    notes?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Service"> | Date | string | null
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrderInput | SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    odometerKm?: SortOrderInput | SortOrder
    nextServiceKm?: SortOrderInput | SortOrder
    nextServiceDate?: SortOrderInput | SortOrder
    laborCost?: SortOrderInput | SortOrder
    partsCost?: SortOrderInput | SortOrder
    totalCost?: SortOrderInput | SortOrder
    garage?: SortOrderInput | SortOrder
    garagePhone?: SortOrderInput | SortOrder
    scheduledDate?: SortOrderInput | SortOrder
    completedDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    vehicleId?: StringWithAggregatesFilter<"Service"> | string
    driverId?: StringNullableWithAggregatesFilter<"Service"> | string | null
    serviceType?: EnumServiceTypeWithAggregatesFilter<"Service"> | $Enums.ServiceType
    status?: EnumServiceStatusWithAggregatesFilter<"Service"> | $Enums.ServiceStatus
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    odometerKm?: IntNullableWithAggregatesFilter<"Service"> | number | null
    nextServiceKm?: IntNullableWithAggregatesFilter<"Service"> | number | null
    nextServiceDate?: DateTimeNullableWithAggregatesFilter<"Service"> | Date | string | null
    laborCost?: FloatNullableWithAggregatesFilter<"Service"> | number | null
    partsCost?: FloatNullableWithAggregatesFilter<"Service"> | number | null
    totalCost?: FloatNullableWithAggregatesFilter<"Service"> | number | null
    garage?: StringNullableWithAggregatesFilter<"Service"> | string | null
    garagePhone?: StringNullableWithAggregatesFilter<"Service"> | string | null
    scheduledDate?: DateTimeNullableWithAggregatesFilter<"Service"> | Date | string | null
    completedDate?: DateTimeNullableWithAggregatesFilter<"Service"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"Service"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Service"> | Date | string | null
  }

  export type RepairWhereInput = {
    AND?: RepairWhereInput | RepairWhereInput[]
    OR?: RepairWhereInput[]
    NOT?: RepairWhereInput | RepairWhereInput[]
    id?: StringFilter<"Repair"> | string
    vehicleId?: StringFilter<"Repair"> | string
    driverId?: StringNullableFilter<"Repair"> | string | null
    status?: EnumRepairStatusFilter<"Repair"> | $Enums.RepairStatus
    priority?: EnumRepairPriorityFilter<"Repair"> | $Enums.RepairPriority
    faultDesc?: StringFilter<"Repair"> | string
    repairDesc?: StringNullableFilter<"Repair"> | string | null
    odometerKm?: IntNullableFilter<"Repair"> | number | null
    laborCost?: FloatNullableFilter<"Repair"> | number | null
    partsCost?: FloatNullableFilter<"Repair"> | number | null
    totalCost?: FloatNullableFilter<"Repair"> | number | null
    garage?: StringNullableFilter<"Repair"> | string | null
    garagePhone?: StringNullableFilter<"Repair"> | string | null
    reportedDate?: DateTimeFilter<"Repair"> | Date | string
    startedDate?: DateTimeNullableFilter<"Repair"> | Date | string | null
    completedDate?: DateTimeNullableFilter<"Repair"> | Date | string | null
    notes?: StringNullableFilter<"Repair"> | string | null
    createdAt?: DateTimeFilter<"Repair"> | Date | string
    updatedAt?: DateTimeFilter<"Repair"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Repair"> | Date | string | null
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
    parts?: PartListRelationFilter
  }

  export type RepairOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    faultDesc?: SortOrder
    repairDesc?: SortOrderInput | SortOrder
    odometerKm?: SortOrderInput | SortOrder
    laborCost?: SortOrderInput | SortOrder
    partsCost?: SortOrderInput | SortOrder
    totalCost?: SortOrderInput | SortOrder
    garage?: SortOrderInput | SortOrder
    garagePhone?: SortOrderInput | SortOrder
    reportedDate?: SortOrder
    startedDate?: SortOrderInput | SortOrder
    completedDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    vehicle?: VehicleOrderByWithRelationInput
    driver?: DriverOrderByWithRelationInput
    parts?: PartOrderByRelationAggregateInput
  }

  export type RepairWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RepairWhereInput | RepairWhereInput[]
    OR?: RepairWhereInput[]
    NOT?: RepairWhereInput | RepairWhereInput[]
    vehicleId?: StringFilter<"Repair"> | string
    driverId?: StringNullableFilter<"Repair"> | string | null
    status?: EnumRepairStatusFilter<"Repair"> | $Enums.RepairStatus
    priority?: EnumRepairPriorityFilter<"Repair"> | $Enums.RepairPriority
    faultDesc?: StringFilter<"Repair"> | string
    repairDesc?: StringNullableFilter<"Repair"> | string | null
    odometerKm?: IntNullableFilter<"Repair"> | number | null
    laborCost?: FloatNullableFilter<"Repair"> | number | null
    partsCost?: FloatNullableFilter<"Repair"> | number | null
    totalCost?: FloatNullableFilter<"Repair"> | number | null
    garage?: StringNullableFilter<"Repair"> | string | null
    garagePhone?: StringNullableFilter<"Repair"> | string | null
    reportedDate?: DateTimeFilter<"Repair"> | Date | string
    startedDate?: DateTimeNullableFilter<"Repair"> | Date | string | null
    completedDate?: DateTimeNullableFilter<"Repair"> | Date | string | null
    notes?: StringNullableFilter<"Repair"> | string | null
    createdAt?: DateTimeFilter<"Repair"> | Date | string
    updatedAt?: DateTimeFilter<"Repair"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Repair"> | Date | string | null
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
    parts?: PartListRelationFilter
  }, "id">

  export type RepairOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    faultDesc?: SortOrder
    repairDesc?: SortOrderInput | SortOrder
    odometerKm?: SortOrderInput | SortOrder
    laborCost?: SortOrderInput | SortOrder
    partsCost?: SortOrderInput | SortOrder
    totalCost?: SortOrderInput | SortOrder
    garage?: SortOrderInput | SortOrder
    garagePhone?: SortOrderInput | SortOrder
    reportedDate?: SortOrder
    startedDate?: SortOrderInput | SortOrder
    completedDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: RepairCountOrderByAggregateInput
    _avg?: RepairAvgOrderByAggregateInput
    _max?: RepairMaxOrderByAggregateInput
    _min?: RepairMinOrderByAggregateInput
    _sum?: RepairSumOrderByAggregateInput
  }

  export type RepairScalarWhereWithAggregatesInput = {
    AND?: RepairScalarWhereWithAggregatesInput | RepairScalarWhereWithAggregatesInput[]
    OR?: RepairScalarWhereWithAggregatesInput[]
    NOT?: RepairScalarWhereWithAggregatesInput | RepairScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Repair"> | string
    vehicleId?: StringWithAggregatesFilter<"Repair"> | string
    driverId?: StringNullableWithAggregatesFilter<"Repair"> | string | null
    status?: EnumRepairStatusWithAggregatesFilter<"Repair"> | $Enums.RepairStatus
    priority?: EnumRepairPriorityWithAggregatesFilter<"Repair"> | $Enums.RepairPriority
    faultDesc?: StringWithAggregatesFilter<"Repair"> | string
    repairDesc?: StringNullableWithAggregatesFilter<"Repair"> | string | null
    odometerKm?: IntNullableWithAggregatesFilter<"Repair"> | number | null
    laborCost?: FloatNullableWithAggregatesFilter<"Repair"> | number | null
    partsCost?: FloatNullableWithAggregatesFilter<"Repair"> | number | null
    totalCost?: FloatNullableWithAggregatesFilter<"Repair"> | number | null
    garage?: StringNullableWithAggregatesFilter<"Repair"> | string | null
    garagePhone?: StringNullableWithAggregatesFilter<"Repair"> | string | null
    reportedDate?: DateTimeWithAggregatesFilter<"Repair"> | Date | string
    startedDate?: DateTimeNullableWithAggregatesFilter<"Repair"> | Date | string | null
    completedDate?: DateTimeNullableWithAggregatesFilter<"Repair"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"Repair"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Repair"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Repair"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Repair"> | Date | string | null
  }

  export type TireWhereInput = {
    AND?: TireWhereInput | TireWhereInput[]
    OR?: TireWhereInput[]
    NOT?: TireWhereInput | TireWhereInput[]
    id?: StringFilter<"Tire"> | string
    vehicleId?: StringFilter<"Tire"> | string
    brand?: StringNullableFilter<"Tire"> | string | null
    size?: StringNullableFilter<"Tire"> | string | null
    serialNumber?: StringNullableFilter<"Tire"> | string | null
    position?: EnumTirePositionFilter<"Tire"> | $Enums.TirePosition
    status?: EnumTireStatusFilter<"Tire"> | $Enums.TireStatus
    fittedOdometerKm?: IntNullableFilter<"Tire"> | number | null
    removedOdometerKm?: IntNullableFilter<"Tire"> | number | null
    kmCovered?: IntNullableFilter<"Tire"> | number | null
    treadDepthMm?: FloatNullableFilter<"Tire"> | number | null
    treadDepthAtRemoval?: FloatNullableFilter<"Tire"> | number | null
    expectedLifeKm?: IntNullableFilter<"Tire"> | number | null
    unitCost?: FloatNullableFilter<"Tire"> | number | null
    supplier?: StringNullableFilter<"Tire"> | string | null
    purchaseDate?: DateTimeNullableFilter<"Tire"> | Date | string | null
    fittedDate?: DateTimeNullableFilter<"Tire"> | Date | string | null
    removedDate?: DateTimeNullableFilter<"Tire"> | Date | string | null
    notes?: StringNullableFilter<"Tire"> | string | null
    createdAt?: DateTimeFilter<"Tire"> | Date | string
    updatedAt?: DateTimeFilter<"Tire"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Tire"> | Date | string | null
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }

  export type TireOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    brand?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    serialNumber?: SortOrderInput | SortOrder
    position?: SortOrder
    status?: SortOrder
    fittedOdometerKm?: SortOrderInput | SortOrder
    removedOdometerKm?: SortOrderInput | SortOrder
    kmCovered?: SortOrderInput | SortOrder
    treadDepthMm?: SortOrderInput | SortOrder
    treadDepthAtRemoval?: SortOrderInput | SortOrder
    expectedLifeKm?: SortOrderInput | SortOrder
    unitCost?: SortOrderInput | SortOrder
    supplier?: SortOrderInput | SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    fittedDate?: SortOrderInput | SortOrder
    removedDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    vehicle?: VehicleOrderByWithRelationInput
  }

  export type TireWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TireWhereInput | TireWhereInput[]
    OR?: TireWhereInput[]
    NOT?: TireWhereInput | TireWhereInput[]
    vehicleId?: StringFilter<"Tire"> | string
    brand?: StringNullableFilter<"Tire"> | string | null
    size?: StringNullableFilter<"Tire"> | string | null
    serialNumber?: StringNullableFilter<"Tire"> | string | null
    position?: EnumTirePositionFilter<"Tire"> | $Enums.TirePosition
    status?: EnumTireStatusFilter<"Tire"> | $Enums.TireStatus
    fittedOdometerKm?: IntNullableFilter<"Tire"> | number | null
    removedOdometerKm?: IntNullableFilter<"Tire"> | number | null
    kmCovered?: IntNullableFilter<"Tire"> | number | null
    treadDepthMm?: FloatNullableFilter<"Tire"> | number | null
    treadDepthAtRemoval?: FloatNullableFilter<"Tire"> | number | null
    expectedLifeKm?: IntNullableFilter<"Tire"> | number | null
    unitCost?: FloatNullableFilter<"Tire"> | number | null
    supplier?: StringNullableFilter<"Tire"> | string | null
    purchaseDate?: DateTimeNullableFilter<"Tire"> | Date | string | null
    fittedDate?: DateTimeNullableFilter<"Tire"> | Date | string | null
    removedDate?: DateTimeNullableFilter<"Tire"> | Date | string | null
    notes?: StringNullableFilter<"Tire"> | string | null
    createdAt?: DateTimeFilter<"Tire"> | Date | string
    updatedAt?: DateTimeFilter<"Tire"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Tire"> | Date | string | null
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }, "id">

  export type TireOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    brand?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    serialNumber?: SortOrderInput | SortOrder
    position?: SortOrder
    status?: SortOrder
    fittedOdometerKm?: SortOrderInput | SortOrder
    removedOdometerKm?: SortOrderInput | SortOrder
    kmCovered?: SortOrderInput | SortOrder
    treadDepthMm?: SortOrderInput | SortOrder
    treadDepthAtRemoval?: SortOrderInput | SortOrder
    expectedLifeKm?: SortOrderInput | SortOrder
    unitCost?: SortOrderInput | SortOrder
    supplier?: SortOrderInput | SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    fittedDate?: SortOrderInput | SortOrder
    removedDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: TireCountOrderByAggregateInput
    _avg?: TireAvgOrderByAggregateInput
    _max?: TireMaxOrderByAggregateInput
    _min?: TireMinOrderByAggregateInput
    _sum?: TireSumOrderByAggregateInput
  }

  export type TireScalarWhereWithAggregatesInput = {
    AND?: TireScalarWhereWithAggregatesInput | TireScalarWhereWithAggregatesInput[]
    OR?: TireScalarWhereWithAggregatesInput[]
    NOT?: TireScalarWhereWithAggregatesInput | TireScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tire"> | string
    vehicleId?: StringWithAggregatesFilter<"Tire"> | string
    brand?: StringNullableWithAggregatesFilter<"Tire"> | string | null
    size?: StringNullableWithAggregatesFilter<"Tire"> | string | null
    serialNumber?: StringNullableWithAggregatesFilter<"Tire"> | string | null
    position?: EnumTirePositionWithAggregatesFilter<"Tire"> | $Enums.TirePosition
    status?: EnumTireStatusWithAggregatesFilter<"Tire"> | $Enums.TireStatus
    fittedOdometerKm?: IntNullableWithAggregatesFilter<"Tire"> | number | null
    removedOdometerKm?: IntNullableWithAggregatesFilter<"Tire"> | number | null
    kmCovered?: IntNullableWithAggregatesFilter<"Tire"> | number | null
    treadDepthMm?: FloatNullableWithAggregatesFilter<"Tire"> | number | null
    treadDepthAtRemoval?: FloatNullableWithAggregatesFilter<"Tire"> | number | null
    expectedLifeKm?: IntNullableWithAggregatesFilter<"Tire"> | number | null
    unitCost?: FloatNullableWithAggregatesFilter<"Tire"> | number | null
    supplier?: StringNullableWithAggregatesFilter<"Tire"> | string | null
    purchaseDate?: DateTimeNullableWithAggregatesFilter<"Tire"> | Date | string | null
    fittedDate?: DateTimeNullableWithAggregatesFilter<"Tire"> | Date | string | null
    removedDate?: DateTimeNullableWithAggregatesFilter<"Tire"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"Tire"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tire"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tire"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Tire"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordChangedAt?: Date | string | null
    name?: string | null
    profileImage: string
    role: $Enums.Role
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    passwordReset?: PasswordResetTokenCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordChangedAt?: Date | string | null
    name?: string | null
    profileImage: string
    role: $Enums.Role
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    passwordReset?: PasswordResetTokenUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordReset?: PasswordResetTokenUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordReset?: PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordChangedAt?: Date | string | null
    name?: string | null
    profileImage: string
    role: $Enums.Role
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    hashedToken: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPasswordResetInput
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    hashedToken: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPasswordResetNestedInput
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    hashedToken: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverCreateInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle?: VehicleCreateNestedOneWithoutDriverInput
    trips?: TripCreateNestedManyWithoutDriverInput
    services?: ServiceCreateNestedManyWithoutDriverInput
    repairs?: RepairCreateNestedManyWithoutDriverInput
    truckDriver?: TruckDriverCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle?: VehicleUncheckedCreateNestedOneWithoutDriverInput
    trips?: TripUncheckedCreateNestedManyWithoutDriverInput
    services?: ServiceUncheckedCreateNestedManyWithoutDriverInput
    repairs?: RepairUncheckedCreateNestedManyWithoutDriverInput
    truckDriver?: TruckDriverUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneWithoutDriverNestedInput
    trips?: TripUpdateManyWithoutDriverNestedInput
    services?: ServiceUpdateManyWithoutDriverNestedInput
    repairs?: RepairUpdateManyWithoutDriverNestedInput
    truckDriver?: TruckDriverUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUncheckedUpdateOneWithoutDriverNestedInput
    trips?: TripUncheckedUpdateManyWithoutDriverNestedInput
    services?: ServiceUncheckedUpdateManyWithoutDriverNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutDriverNestedInput
    truckDriver?: TruckDriverUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type DriverCreateManyInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type DriverUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DriverUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VehicleCreateInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    driver?: DriverCreateNestedOneWithoutVehicleInput
    trips?: TripCreateNestedManyWithoutVehicleInput
    truckDriver?: TruckDriverCreateNestedManyWithoutVehicleInput
    services?: ServiceCreateNestedManyWithoutVehicleInput
    repairs?: RepairCreateNestedManyWithoutVehicleInput
    parts?: PartCreateNestedManyWithoutVehicleInput
    tires?: TireCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    driverId?: string | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    trips?: TripUncheckedCreateNestedManyWithoutVehicleInput
    truckDriver?: TruckDriverUncheckedCreateNestedManyWithoutVehicleInput
    services?: ServiceUncheckedCreateNestedManyWithoutVehicleInput
    repairs?: RepairUncheckedCreateNestedManyWithoutVehicleInput
    parts?: PartUncheckedCreateNestedManyWithoutVehicleInput
    tires?: TireUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver?: DriverUpdateOneWithoutVehicleNestedInput
    trips?: TripUpdateManyWithoutVehicleNestedInput
    truckDriver?: TruckDriverUpdateManyWithoutVehicleNestedInput
    services?: ServiceUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUpdateManyWithoutVehicleNestedInput
    parts?: PartUpdateManyWithoutVehicleNestedInput
    tires?: TireUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trips?: TripUncheckedUpdateManyWithoutVehicleNestedInput
    truckDriver?: TruckDriverUncheckedUpdateManyWithoutVehicleNestedInput
    services?: ServiceUncheckedUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutVehicleNestedInput
    parts?: PartUncheckedUpdateManyWithoutVehicleNestedInput
    tires?: TireUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateManyInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    driverId?: string | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TruckDriverCreateInput = {
    id?: string
    from?: Date | string | null
    to?: Date | string | null
    createdAt?: Date | string
    vehicle: VehicleCreateNestedOneWithoutTruckDriverInput
    driver: DriverCreateNestedOneWithoutTruckDriverInput
  }

  export type TruckDriverUncheckedCreateInput = {
    id?: string
    vehicleId: string
    driverId: string
    from?: Date | string | null
    to?: Date | string | null
    createdAt?: Date | string
  }

  export type TruckDriverUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutTruckDriverNestedInput
    driver?: DriverUpdateOneRequiredWithoutTruckDriverNestedInput
  }

  export type TruckDriverUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TruckDriverCreateManyInput = {
    id?: string
    vehicleId: string
    driverId: string
    from?: Date | string | null
    to?: Date | string | null
    createdAt?: Date | string
  }

  export type TruckDriverUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TruckDriverUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripCreateInput = {
    id?: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedManyWithoutTripInput
    vehicle: VehicleCreateNestedOneWithoutTripsInput
    driver: DriverCreateNestedOneWithoutTripsInput
    fuels?: FuelCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateInput = {
    id?: string
    vehicleId: string
    driverId: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedManyWithoutTripInput
    fuels?: FuelUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateManyWithoutTripNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutTripsNestedInput
    driver?: DriverUpdateOneRequiredWithoutTripsNestedInput
    fuels?: FuelUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateManyWithoutTripNestedInput
    fuels?: FuelUncheckedUpdateManyWithoutTripNestedInput
  }

  export type TripCreateManyInput = {
    id?: string
    vehicleId: string
    driverId: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    customerName: string
    company: string
    noOfBags?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trip: TripCreateNestedOneWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    customerName: string
    tripId: string
    company: string
    noOfBags?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    noOfBags?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trip?: TripUpdateOneRequiredWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    noOfBags?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateManyInput = {
    id?: string
    customerName: string
    tripId: string
    company: string
    noOfBags?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    noOfBags?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    noOfBags?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelCreateInput = {
    id?: string
    type: $Enums.FuelType
    qtyGiven: number
    unit: string
    unitPrice?: number | null
    fuelCost?: number | null
    distanceKm?: number | null
    estimatedCO2?: number | null
    dieselEquivalentL?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trip: TripCreateNestedOneWithoutFuelsInput
  }

  export type FuelUncheckedCreateInput = {
    id?: string
    type: $Enums.FuelType
    tripId: string
    qtyGiven: number
    unit: string
    unitPrice?: number | null
    fuelCost?: number | null
    distanceKm?: number | null
    estimatedCO2?: number | null
    dieselEquivalentL?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FuelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    qtyGiven?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    fuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    estimatedCO2?: NullableFloatFieldUpdateOperationsInput | number | null
    dieselEquivalentL?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trip?: TripUpdateOneRequiredWithoutFuelsNestedInput
  }

  export type FuelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    tripId?: StringFieldUpdateOperationsInput | string
    qtyGiven?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    fuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    estimatedCO2?: NullableFloatFieldUpdateOperationsInput | number | null
    dieselEquivalentL?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelCreateManyInput = {
    id?: string
    type: $Enums.FuelType
    tripId: string
    qtyGiven: number
    unit: string
    unitPrice?: number | null
    fuelCost?: number | null
    distanceKm?: number | null
    estimatedCO2?: number | null
    dieselEquivalentL?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FuelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    qtyGiven?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    fuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    estimatedCO2?: NullableFloatFieldUpdateOperationsInput | number | null
    dieselEquivalentL?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    tripId?: StringFieldUpdateOperationsInput | string
    qtyGiven?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    fuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    estimatedCO2?: NullableFloatFieldUpdateOperationsInput | number | null
    dieselEquivalentL?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartCreateInput = {
    id?: string
    name: string
    partNumber?: string | null
    category?: string | null
    quantity?: number
    unitCost: number
    totalCost: number
    supplier?: string | null
    supplierPhone?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    warrantyExpiry?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle: VehicleCreateNestedOneWithoutPartsInput
    repair?: RepairCreateNestedOneWithoutPartsInput
  }

  export type PartUncheckedCreateInput = {
    id?: string
    vehicleId: string
    repairId?: string | null
    name: string
    partNumber?: string | null
    category?: string | null
    quantity?: number
    unitCost: number
    totalCost: number
    supplier?: string | null
    supplierPhone?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    warrantyExpiry?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierPhone?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneRequiredWithoutPartsNestedInput
    repair?: RepairUpdateOneWithoutPartsNestedInput
  }

  export type PartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierPhone?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PartCreateManyInput = {
    id?: string
    vehicleId: string
    repairId?: string | null
    name: string
    partNumber?: string | null
    category?: string | null
    quantity?: number
    unitCost: number
    totalCost: number
    supplier?: string | null
    supplierPhone?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    warrantyExpiry?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierPhone?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierPhone?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ServiceCreateInput = {
    id?: string
    serviceType?: $Enums.ServiceType
    status?: $Enums.ServiceStatus
    description?: string | null
    odometerKm?: number | null
    nextServiceKm?: number | null
    nextServiceDate?: Date | string | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle: VehicleCreateNestedOneWithoutServicesInput
    driver?: DriverCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    vehicleId: string
    driverId?: string | null
    serviceType?: $Enums.ServiceType
    status?: $Enums.ServiceStatus
    description?: string | null
    odometerKm?: number | null
    nextServiceKm?: number | null
    nextServiceDate?: Date | string | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneRequiredWithoutServicesNestedInput
    driver?: DriverUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ServiceCreateManyInput = {
    id?: string
    vehicleId: string
    driverId?: string | null
    serviceType?: $Enums.ServiceType
    status?: $Enums.ServiceStatus
    description?: string | null
    odometerKm?: number | null
    nextServiceKm?: number | null
    nextServiceDate?: Date | string | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RepairCreateInput = {
    id?: string
    status?: $Enums.RepairStatus
    priority?: $Enums.RepairPriority
    faultDesc: string
    repairDesc?: string | null
    odometerKm?: number | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    reportedDate?: Date | string
    startedDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle: VehicleCreateNestedOneWithoutRepairsInput
    driver?: DriverCreateNestedOneWithoutRepairsInput
    parts?: PartCreateNestedManyWithoutRepairInput
  }

  export type RepairUncheckedCreateInput = {
    id?: string
    vehicleId: string
    driverId?: string | null
    status?: $Enums.RepairStatus
    priority?: $Enums.RepairPriority
    faultDesc: string
    repairDesc?: string | null
    odometerKm?: number | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    reportedDate?: Date | string
    startedDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parts?: PartUncheckedCreateNestedManyWithoutRepairInput
  }

  export type RepairUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    priority?: EnumRepairPriorityFieldUpdateOperationsInput | $Enums.RepairPriority
    faultDesc?: StringFieldUpdateOperationsInput | string
    repairDesc?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    reportedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneRequiredWithoutRepairsNestedInput
    driver?: DriverUpdateOneWithoutRepairsNestedInput
    parts?: PartUpdateManyWithoutRepairNestedInput
  }

  export type RepairUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    priority?: EnumRepairPriorityFieldUpdateOperationsInput | $Enums.RepairPriority
    faultDesc?: StringFieldUpdateOperationsInput | string
    repairDesc?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    reportedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parts?: PartUncheckedUpdateManyWithoutRepairNestedInput
  }

  export type RepairCreateManyInput = {
    id?: string
    vehicleId: string
    driverId?: string | null
    status?: $Enums.RepairStatus
    priority?: $Enums.RepairPriority
    faultDesc: string
    repairDesc?: string | null
    odometerKm?: number | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    reportedDate?: Date | string
    startedDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type RepairUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    priority?: EnumRepairPriorityFieldUpdateOperationsInput | $Enums.RepairPriority
    faultDesc?: StringFieldUpdateOperationsInput | string
    repairDesc?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    reportedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RepairUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    priority?: EnumRepairPriorityFieldUpdateOperationsInput | $Enums.RepairPriority
    faultDesc?: StringFieldUpdateOperationsInput | string
    repairDesc?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    reportedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TireCreateInput = {
    id?: string
    brand?: string | null
    size?: string | null
    serialNumber?: string | null
    position?: $Enums.TirePosition
    status?: $Enums.TireStatus
    fittedOdometerKm?: number | null
    removedOdometerKm?: number | null
    kmCovered?: number | null
    treadDepthMm?: number | null
    treadDepthAtRemoval?: number | null
    expectedLifeKm?: number | null
    unitCost?: number | null
    supplier?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    removedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle: VehicleCreateNestedOneWithoutTiresInput
  }

  export type TireUncheckedCreateInput = {
    id?: string
    vehicleId: string
    brand?: string | null
    size?: string | null
    serialNumber?: string | null
    position?: $Enums.TirePosition
    status?: $Enums.TireStatus
    fittedOdometerKm?: number | null
    removedOdometerKm?: number | null
    kmCovered?: number | null
    treadDepthMm?: number | null
    treadDepthAtRemoval?: number | null
    expectedLifeKm?: number | null
    unitCost?: number | null
    supplier?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    removedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type TireUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    position?: EnumTirePositionFieldUpdateOperationsInput | $Enums.TirePosition
    status?: EnumTireStatusFieldUpdateOperationsInput | $Enums.TireStatus
    fittedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    removedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    kmCovered?: NullableIntFieldUpdateOperationsInput | number | null
    treadDepthMm?: NullableFloatFieldUpdateOperationsInput | number | null
    treadDepthAtRemoval?: NullableFloatFieldUpdateOperationsInput | number | null
    expectedLifeKm?: NullableIntFieldUpdateOperationsInput | number | null
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneRequiredWithoutTiresNestedInput
  }

  export type TireUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    position?: EnumTirePositionFieldUpdateOperationsInput | $Enums.TirePosition
    status?: EnumTireStatusFieldUpdateOperationsInput | $Enums.TireStatus
    fittedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    removedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    kmCovered?: NullableIntFieldUpdateOperationsInput | number | null
    treadDepthMm?: NullableFloatFieldUpdateOperationsInput | number | null
    treadDepthAtRemoval?: NullableFloatFieldUpdateOperationsInput | number | null
    expectedLifeKm?: NullableIntFieldUpdateOperationsInput | number | null
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TireCreateManyInput = {
    id?: string
    vehicleId: string
    brand?: string | null
    size?: string | null
    serialNumber?: string | null
    position?: $Enums.TirePosition
    status?: $Enums.TireStatus
    fittedOdometerKm?: number | null
    removedOdometerKm?: number | null
    kmCovered?: number | null
    treadDepthMm?: number | null
    treadDepthAtRemoval?: number | null
    expectedLifeKm?: number | null
    unitCost?: number | null
    supplier?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    removedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type TireUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    position?: EnumTirePositionFieldUpdateOperationsInput | $Enums.TirePosition
    status?: EnumTireStatusFieldUpdateOperationsInput | $Enums.TireStatus
    fittedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    removedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    kmCovered?: NullableIntFieldUpdateOperationsInput | number | null
    treadDepthMm?: NullableFloatFieldUpdateOperationsInput | number | null
    treadDepthAtRemoval?: NullableFloatFieldUpdateOperationsInput | number | null
    expectedLifeKm?: NullableIntFieldUpdateOperationsInput | number | null
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TireUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    position?: EnumTirePositionFieldUpdateOperationsInput | $Enums.TirePosition
    status?: EnumTireStatusFieldUpdateOperationsInput | $Enums.TireStatus
    fittedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    removedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    kmCovered?: NullableIntFieldUpdateOperationsInput | number | null
    treadDepthMm?: NullableFloatFieldUpdateOperationsInput | number | null
    treadDepthAtRemoval?: NullableFloatFieldUpdateOperationsInput | number | null
    expectedLifeKm?: NullableIntFieldUpdateOperationsInput | number | null
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PasswordResetTokenNullableScalarRelationFilter = {
    is?: PasswordResetTokenWhereInput | null
    isNot?: PasswordResetTokenWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordChangedAt?: SortOrder
    name?: SortOrder
    profileImage?: SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordChangedAt?: SortOrder
    name?: SortOrder
    profileImage?: SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordChangedAt?: SortOrder
    name?: SortOrder
    profileImage?: SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    hashedToken?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    hashedToken?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    hashedToken?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VehicleNullableScalarRelationFilter = {
    is?: VehicleWhereInput | null
    isNot?: VehicleWhereInput | null
  }

  export type TripListRelationFilter = {
    every?: TripWhereInput
    some?: TripWhereInput
    none?: TripWhereInput
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type RepairListRelationFilter = {
    every?: RepairWhereInput
    some?: RepairWhereInput
    none?: RepairWhereInput
  }

  export type TruckDriverListRelationFilter = {
    every?: TruckDriverWhereInput
    some?: TruckDriverWhereInput
    none?: TruckDriverWhereInput
  }

  export type TripOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RepairOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TruckDriverOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DriverCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    profileImage?: SortOrder
    licenseNo?: SortOrder
    licenseExp?: SortOrder
    licenseImage?: SortOrder
    accountName?: SortOrder
    accountNumber?: SortOrder
    bank?: SortOrder
    guarantorForm?: SortOrder
    fingerPrint?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type DriverMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    profileImage?: SortOrder
    licenseNo?: SortOrder
    licenseExp?: SortOrder
    licenseImage?: SortOrder
    accountName?: SortOrder
    accountNumber?: SortOrder
    bank?: SortOrder
    guarantorForm?: SortOrder
    fingerPrint?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type DriverMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    profileImage?: SortOrder
    licenseNo?: SortOrder
    licenseExp?: SortOrder
    licenseImage?: SortOrder
    accountName?: SortOrder
    accountNumber?: SortOrder
    bank?: SortOrder
    guarantorForm?: SortOrder
    fingerPrint?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumFuelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FuelType | EnumFuelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FuelType[] | ListEnumFuelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FuelType[] | ListEnumFuelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFuelTypeFilter<$PrismaModel> | $Enums.FuelType
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DriverNullableScalarRelationFilter = {
    is?: DriverWhereInput | null
    isNot?: DriverWhereInput | null
  }

  export type PartListRelationFilter = {
    every?: PartWhereInput
    some?: PartWhereInput
    none?: PartWhereInput
  }

  export type TireListRelationFilter = {
    every?: TireWhereInput
    some?: TireWhereInput
    none?: TireWhereInput
  }

  export type PartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TireOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    vin?: SortOrder
    plateNumber?: SortOrder
    cap_no?: SortOrder
    make?: SortOrder
    vehicleImg?: SortOrder
    model?: SortOrder
    year?: SortOrder
    fuelType?: SortOrder
    fuelEfficiencyKmPerUnit?: SortOrder
    driverId?: SortOrder
    currentOdo?: SortOrder
    createdAt?: SortOrder
    asssignDate?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    year?: SortOrder
    fuelEfficiencyKmPerUnit?: SortOrder
    currentOdo?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    vin?: SortOrder
    plateNumber?: SortOrder
    cap_no?: SortOrder
    make?: SortOrder
    vehicleImg?: SortOrder
    model?: SortOrder
    year?: SortOrder
    fuelType?: SortOrder
    fuelEfficiencyKmPerUnit?: SortOrder
    driverId?: SortOrder
    currentOdo?: SortOrder
    createdAt?: SortOrder
    asssignDate?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    vin?: SortOrder
    plateNumber?: SortOrder
    cap_no?: SortOrder
    make?: SortOrder
    vehicleImg?: SortOrder
    model?: SortOrder
    year?: SortOrder
    fuelType?: SortOrder
    fuelEfficiencyKmPerUnit?: SortOrder
    driverId?: SortOrder
    currentOdo?: SortOrder
    createdAt?: SortOrder
    asssignDate?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    year?: SortOrder
    fuelEfficiencyKmPerUnit?: SortOrder
    currentOdo?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumFuelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FuelType | EnumFuelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FuelType[] | ListEnumFuelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FuelType[] | ListEnumFuelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFuelTypeWithAggregatesFilter<$PrismaModel> | $Enums.FuelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFuelTypeFilter<$PrismaModel>
    _max?: NestedEnumFuelTypeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type VehicleScalarRelationFilter = {
    is?: VehicleWhereInput
    isNot?: VehicleWhereInput
  }

  export type DriverScalarRelationFilter = {
    is?: DriverWhereInput
    isNot?: DriverWhereInput
  }

  export type TruckDriverCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    from?: SortOrder
    to?: SortOrder
    createdAt?: SortOrder
  }

  export type TruckDriverMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    from?: SortOrder
    to?: SortOrder
    createdAt?: SortOrder
  }

  export type TruckDriverMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    from?: SortOrder
    to?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumTripStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TripStatus | EnumTripStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTripStatusFilter<$PrismaModel> | $Enums.TripStatus
  }

  export type CustomerListRelationFilter = {
    every?: CustomerWhereInput
    some?: CustomerWhereInput
    none?: CustomerWhereInput
  }

  export type FuelListRelationFilter = {
    every?: FuelWhereInput
    some?: FuelWhereInput
    none?: FuelWhereInput
  }

  export type CustomerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FuelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TripCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    loadingPlant?: SortOrder
    waybill_no?: SortOrder
    atcNo?: SortOrder
    company?: SortOrder
    destination?: SortOrder
    despatchDate?: SortOrder
    uploadDate?: SortOrder
    totaldistanceKm?: SortOrder
    odoStart?: SortOrder
    odoEnd?: SortOrder
    totalFuelCost?: SortOrder
    totalCO2Kg?: SortOrder
    costPerKm?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripAvgOrderByAggregateInput = {
    totaldistanceKm?: SortOrder
    odoStart?: SortOrder
    odoEnd?: SortOrder
    totalFuelCost?: SortOrder
    totalCO2Kg?: SortOrder
    costPerKm?: SortOrder
  }

  export type TripMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    loadingPlant?: SortOrder
    waybill_no?: SortOrder
    atcNo?: SortOrder
    company?: SortOrder
    destination?: SortOrder
    despatchDate?: SortOrder
    uploadDate?: SortOrder
    totaldistanceKm?: SortOrder
    odoStart?: SortOrder
    odoEnd?: SortOrder
    totalFuelCost?: SortOrder
    totalCO2Kg?: SortOrder
    costPerKm?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    loadingPlant?: SortOrder
    waybill_no?: SortOrder
    atcNo?: SortOrder
    company?: SortOrder
    destination?: SortOrder
    despatchDate?: SortOrder
    uploadDate?: SortOrder
    totaldistanceKm?: SortOrder
    odoStart?: SortOrder
    odoEnd?: SortOrder
    totalFuelCost?: SortOrder
    totalCO2Kg?: SortOrder
    costPerKm?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripSumOrderByAggregateInput = {
    totaldistanceKm?: SortOrder
    odoStart?: SortOrder
    odoEnd?: SortOrder
    totalFuelCost?: SortOrder
    totalCO2Kg?: SortOrder
    costPerKm?: SortOrder
  }

  export type EnumTripStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripStatus | EnumTripStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTripStatusWithAggregatesFilter<$PrismaModel> | $Enums.TripStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTripStatusFilter<$PrismaModel>
    _max?: NestedEnumTripStatusFilter<$PrismaModel>
  }

  export type TripScalarRelationFilter = {
    is?: TripWhereInput
    isNot?: TripWhereInput
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    tripId?: SortOrder
    company?: SortOrder
    noOfBags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    noOfBags?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    tripId?: SortOrder
    company?: SortOrder
    noOfBags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    tripId?: SortOrder
    company?: SortOrder
    noOfBags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    noOfBags?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FuelCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    tripId?: SortOrder
    qtyGiven?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrder
    fuelCost?: SortOrder
    distanceKm?: SortOrder
    estimatedCO2?: SortOrder
    dieselEquivalentL?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FuelAvgOrderByAggregateInput = {
    qtyGiven?: SortOrder
    unitPrice?: SortOrder
    fuelCost?: SortOrder
    distanceKm?: SortOrder
    estimatedCO2?: SortOrder
    dieselEquivalentL?: SortOrder
  }

  export type FuelMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    tripId?: SortOrder
    qtyGiven?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrder
    fuelCost?: SortOrder
    distanceKm?: SortOrder
    estimatedCO2?: SortOrder
    dieselEquivalentL?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FuelMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    tripId?: SortOrder
    qtyGiven?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrder
    fuelCost?: SortOrder
    distanceKm?: SortOrder
    estimatedCO2?: SortOrder
    dieselEquivalentL?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FuelSumOrderByAggregateInput = {
    qtyGiven?: SortOrder
    unitPrice?: SortOrder
    fuelCost?: SortOrder
    distanceKm?: SortOrder
    estimatedCO2?: SortOrder
    dieselEquivalentL?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RepairNullableScalarRelationFilter = {
    is?: RepairWhereInput | null
    isNot?: RepairWhereInput | null
  }

  export type PartCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    repairId?: SortOrder
    name?: SortOrder
    partNumber?: SortOrder
    category?: SortOrder
    quantity?: SortOrder
    unitCost?: SortOrder
    totalCost?: SortOrder
    supplier?: SortOrder
    supplierPhone?: SortOrder
    purchaseDate?: SortOrder
    fittedDate?: SortOrder
    warrantyExpiry?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PartAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitCost?: SortOrder
    totalCost?: SortOrder
  }

  export type PartMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    repairId?: SortOrder
    name?: SortOrder
    partNumber?: SortOrder
    category?: SortOrder
    quantity?: SortOrder
    unitCost?: SortOrder
    totalCost?: SortOrder
    supplier?: SortOrder
    supplierPhone?: SortOrder
    purchaseDate?: SortOrder
    fittedDate?: SortOrder
    warrantyExpiry?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PartMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    repairId?: SortOrder
    name?: SortOrder
    partNumber?: SortOrder
    category?: SortOrder
    quantity?: SortOrder
    unitCost?: SortOrder
    totalCost?: SortOrder
    supplier?: SortOrder
    supplierPhone?: SortOrder
    purchaseDate?: SortOrder
    fittedDate?: SortOrder
    warrantyExpiry?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PartSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitCost?: SortOrder
    totalCost?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeFilter<$PrismaModel> | $Enums.ServiceType
  }

  export type EnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    description?: SortOrder
    odometerKm?: SortOrder
    nextServiceKm?: SortOrder
    nextServiceDate?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    totalCost?: SortOrder
    garage?: SortOrder
    garagePhone?: SortOrder
    scheduledDate?: SortOrder
    completedDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    odometerKm?: SortOrder
    nextServiceKm?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    totalCost?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    description?: SortOrder
    odometerKm?: SortOrder
    nextServiceKm?: SortOrder
    nextServiceDate?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    totalCost?: SortOrder
    garage?: SortOrder
    garagePhone?: SortOrder
    scheduledDate?: SortOrder
    completedDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    description?: SortOrder
    odometerKm?: SortOrder
    nextServiceKm?: SortOrder
    nextServiceDate?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    totalCost?: SortOrder
    garage?: SortOrder
    garagePhone?: SortOrder
    scheduledDate?: SortOrder
    completedDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    odometerKm?: SortOrder
    nextServiceKm?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    totalCost?: SortOrder
  }

  export type EnumServiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ServiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceTypeFilter<$PrismaModel>
    _max?: NestedEnumServiceTypeFilter<$PrismaModel>
  }

  export type EnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type EnumRepairStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairStatus | EnumRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRepairStatusFilter<$PrismaModel> | $Enums.RepairStatus
  }

  export type EnumRepairPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairPriority | EnumRepairPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.RepairPriority[] | ListEnumRepairPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepairPriority[] | ListEnumRepairPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumRepairPriorityFilter<$PrismaModel> | $Enums.RepairPriority
  }

  export type RepairCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    faultDesc?: SortOrder
    repairDesc?: SortOrder
    odometerKm?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    totalCost?: SortOrder
    garage?: SortOrder
    garagePhone?: SortOrder
    reportedDate?: SortOrder
    startedDate?: SortOrder
    completedDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type RepairAvgOrderByAggregateInput = {
    odometerKm?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    totalCost?: SortOrder
  }

  export type RepairMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    faultDesc?: SortOrder
    repairDesc?: SortOrder
    odometerKm?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    totalCost?: SortOrder
    garage?: SortOrder
    garagePhone?: SortOrder
    reportedDate?: SortOrder
    startedDate?: SortOrder
    completedDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type RepairMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    driverId?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    faultDesc?: SortOrder
    repairDesc?: SortOrder
    odometerKm?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    totalCost?: SortOrder
    garage?: SortOrder
    garagePhone?: SortOrder
    reportedDate?: SortOrder
    startedDate?: SortOrder
    completedDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type RepairSumOrderByAggregateInput = {
    odometerKm?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    totalCost?: SortOrder
  }

  export type EnumRepairStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairStatus | EnumRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRepairStatusWithAggregatesFilter<$PrismaModel> | $Enums.RepairStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRepairStatusFilter<$PrismaModel>
    _max?: NestedEnumRepairStatusFilter<$PrismaModel>
  }

  export type EnumRepairPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairPriority | EnumRepairPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.RepairPriority[] | ListEnumRepairPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepairPriority[] | ListEnumRepairPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumRepairPriorityWithAggregatesFilter<$PrismaModel> | $Enums.RepairPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRepairPriorityFilter<$PrismaModel>
    _max?: NestedEnumRepairPriorityFilter<$PrismaModel>
  }

  export type EnumTirePositionFilter<$PrismaModel = never> = {
    equals?: $Enums.TirePosition | EnumTirePositionFieldRefInput<$PrismaModel>
    in?: $Enums.TirePosition[] | ListEnumTirePositionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TirePosition[] | ListEnumTirePositionFieldRefInput<$PrismaModel>
    not?: NestedEnumTirePositionFilter<$PrismaModel> | $Enums.TirePosition
  }

  export type EnumTireStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TireStatus | EnumTireStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TireStatus[] | ListEnumTireStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TireStatus[] | ListEnumTireStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTireStatusFilter<$PrismaModel> | $Enums.TireStatus
  }

  export type TireCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    brand?: SortOrder
    size?: SortOrder
    serialNumber?: SortOrder
    position?: SortOrder
    status?: SortOrder
    fittedOdometerKm?: SortOrder
    removedOdometerKm?: SortOrder
    kmCovered?: SortOrder
    treadDepthMm?: SortOrder
    treadDepthAtRemoval?: SortOrder
    expectedLifeKm?: SortOrder
    unitCost?: SortOrder
    supplier?: SortOrder
    purchaseDate?: SortOrder
    fittedDate?: SortOrder
    removedDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type TireAvgOrderByAggregateInput = {
    fittedOdometerKm?: SortOrder
    removedOdometerKm?: SortOrder
    kmCovered?: SortOrder
    treadDepthMm?: SortOrder
    treadDepthAtRemoval?: SortOrder
    expectedLifeKm?: SortOrder
    unitCost?: SortOrder
  }

  export type TireMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    brand?: SortOrder
    size?: SortOrder
    serialNumber?: SortOrder
    position?: SortOrder
    status?: SortOrder
    fittedOdometerKm?: SortOrder
    removedOdometerKm?: SortOrder
    kmCovered?: SortOrder
    treadDepthMm?: SortOrder
    treadDepthAtRemoval?: SortOrder
    expectedLifeKm?: SortOrder
    unitCost?: SortOrder
    supplier?: SortOrder
    purchaseDate?: SortOrder
    fittedDate?: SortOrder
    removedDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type TireMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    brand?: SortOrder
    size?: SortOrder
    serialNumber?: SortOrder
    position?: SortOrder
    status?: SortOrder
    fittedOdometerKm?: SortOrder
    removedOdometerKm?: SortOrder
    kmCovered?: SortOrder
    treadDepthMm?: SortOrder
    treadDepthAtRemoval?: SortOrder
    expectedLifeKm?: SortOrder
    unitCost?: SortOrder
    supplier?: SortOrder
    purchaseDate?: SortOrder
    fittedDate?: SortOrder
    removedDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type TireSumOrderByAggregateInput = {
    fittedOdometerKm?: SortOrder
    removedOdometerKm?: SortOrder
    kmCovered?: SortOrder
    treadDepthMm?: SortOrder
    treadDepthAtRemoval?: SortOrder
    expectedLifeKm?: SortOrder
    unitCost?: SortOrder
  }

  export type EnumTirePositionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TirePosition | EnumTirePositionFieldRefInput<$PrismaModel>
    in?: $Enums.TirePosition[] | ListEnumTirePositionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TirePosition[] | ListEnumTirePositionFieldRefInput<$PrismaModel>
    not?: NestedEnumTirePositionWithAggregatesFilter<$PrismaModel> | $Enums.TirePosition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTirePositionFilter<$PrismaModel>
    _max?: NestedEnumTirePositionFilter<$PrismaModel>
  }

  export type EnumTireStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TireStatus | EnumTireStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TireStatus[] | ListEnumTireStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TireStatus[] | ListEnumTireStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTireStatusWithAggregatesFilter<$PrismaModel> | $Enums.TireStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTireStatusFilter<$PrismaModel>
    _max?: NestedEnumTireStatusFilter<$PrismaModel>
  }

  export type PasswordResetTokenCreateNestedOneWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput
    connect?: PasswordResetTokenWhereUniqueInput
  }

  export type PasswordResetTokenUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput
    connect?: PasswordResetTokenWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PasswordResetTokenUpdateOneWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput
    upsert?: PasswordResetTokenUpsertWithoutUserInput
    disconnect?: PasswordResetTokenWhereInput | boolean
    delete?: PasswordResetTokenWhereInput | boolean
    connect?: PasswordResetTokenWhereUniqueInput
    update?: XOR<XOR<PasswordResetTokenUpdateToOneWithWhereWithoutUserInput, PasswordResetTokenUpdateWithoutUserInput>, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput
    upsert?: PasswordResetTokenUpsertWithoutUserInput
    disconnect?: PasswordResetTokenWhereInput | boolean
    delete?: PasswordResetTokenWhereInput | boolean
    connect?: PasswordResetTokenWhereUniqueInput
    update?: XOR<XOR<PasswordResetTokenUpdateToOneWithWhereWithoutUserInput, PasswordResetTokenUpdateWithoutUserInput>, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutPasswordResetInput = {
    create?: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordResetNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetInput
    upsert?: UserUpsertWithoutPasswordResetInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetInput, UserUpdateWithoutPasswordResetInput>, UserUncheckedUpdateWithoutPasswordResetInput>
  }

  export type VehicleCreateNestedOneWithoutDriverInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput
    connect?: VehicleWhereUniqueInput
  }

  export type TripCreateNestedManyWithoutDriverInput = {
    create?: XOR<TripCreateWithoutDriverInput, TripUncheckedCreateWithoutDriverInput> | TripCreateWithoutDriverInput[] | TripUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: TripCreateOrConnectWithoutDriverInput | TripCreateOrConnectWithoutDriverInput[]
    createMany?: TripCreateManyDriverInputEnvelope
    connect?: TripWhereUniqueInput | TripWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutDriverInput = {
    create?: XOR<ServiceCreateWithoutDriverInput, ServiceUncheckedCreateWithoutDriverInput> | ServiceCreateWithoutDriverInput[] | ServiceUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutDriverInput | ServiceCreateOrConnectWithoutDriverInput[]
    createMany?: ServiceCreateManyDriverInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type RepairCreateNestedManyWithoutDriverInput = {
    create?: XOR<RepairCreateWithoutDriverInput, RepairUncheckedCreateWithoutDriverInput> | RepairCreateWithoutDriverInput[] | RepairUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RepairCreateOrConnectWithoutDriverInput | RepairCreateOrConnectWithoutDriverInput[]
    createMany?: RepairCreateManyDriverInputEnvelope
    connect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
  }

  export type TruckDriverCreateNestedManyWithoutDriverInput = {
    create?: XOR<TruckDriverCreateWithoutDriverInput, TruckDriverUncheckedCreateWithoutDriverInput> | TruckDriverCreateWithoutDriverInput[] | TruckDriverUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: TruckDriverCreateOrConnectWithoutDriverInput | TruckDriverCreateOrConnectWithoutDriverInput[]
    createMany?: TruckDriverCreateManyDriverInputEnvelope
    connect?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
  }

  export type VehicleUncheckedCreateNestedOneWithoutDriverInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput
    connect?: VehicleWhereUniqueInput
  }

  export type TripUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<TripCreateWithoutDriverInput, TripUncheckedCreateWithoutDriverInput> | TripCreateWithoutDriverInput[] | TripUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: TripCreateOrConnectWithoutDriverInput | TripCreateOrConnectWithoutDriverInput[]
    createMany?: TripCreateManyDriverInputEnvelope
    connect?: TripWhereUniqueInput | TripWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<ServiceCreateWithoutDriverInput, ServiceUncheckedCreateWithoutDriverInput> | ServiceCreateWithoutDriverInput[] | ServiceUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutDriverInput | ServiceCreateOrConnectWithoutDriverInput[]
    createMany?: ServiceCreateManyDriverInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type RepairUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<RepairCreateWithoutDriverInput, RepairUncheckedCreateWithoutDriverInput> | RepairCreateWithoutDriverInput[] | RepairUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RepairCreateOrConnectWithoutDriverInput | RepairCreateOrConnectWithoutDriverInput[]
    createMany?: RepairCreateManyDriverInputEnvelope
    connect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
  }

  export type TruckDriverUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<TruckDriverCreateWithoutDriverInput, TruckDriverUncheckedCreateWithoutDriverInput> | TruckDriverCreateWithoutDriverInput[] | TruckDriverUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: TruckDriverCreateOrConnectWithoutDriverInput | TruckDriverCreateOrConnectWithoutDriverInput[]
    createMany?: TruckDriverCreateManyDriverInputEnvelope
    connect?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
  }

  export type VehicleUpdateOneWithoutDriverNestedInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput
    upsert?: VehicleUpsertWithoutDriverInput
    disconnect?: VehicleWhereInput | boolean
    delete?: VehicleWhereInput | boolean
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutDriverInput, VehicleUpdateWithoutDriverInput>, VehicleUncheckedUpdateWithoutDriverInput>
  }

  export type TripUpdateManyWithoutDriverNestedInput = {
    create?: XOR<TripCreateWithoutDriverInput, TripUncheckedCreateWithoutDriverInput> | TripCreateWithoutDriverInput[] | TripUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: TripCreateOrConnectWithoutDriverInput | TripCreateOrConnectWithoutDriverInput[]
    upsert?: TripUpsertWithWhereUniqueWithoutDriverInput | TripUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: TripCreateManyDriverInputEnvelope
    set?: TripWhereUniqueInput | TripWhereUniqueInput[]
    disconnect?: TripWhereUniqueInput | TripWhereUniqueInput[]
    delete?: TripWhereUniqueInput | TripWhereUniqueInput[]
    connect?: TripWhereUniqueInput | TripWhereUniqueInput[]
    update?: TripUpdateWithWhereUniqueWithoutDriverInput | TripUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: TripUpdateManyWithWhereWithoutDriverInput | TripUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: TripScalarWhereInput | TripScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutDriverNestedInput = {
    create?: XOR<ServiceCreateWithoutDriverInput, ServiceUncheckedCreateWithoutDriverInput> | ServiceCreateWithoutDriverInput[] | ServiceUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutDriverInput | ServiceCreateOrConnectWithoutDriverInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutDriverInput | ServiceUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: ServiceCreateManyDriverInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutDriverInput | ServiceUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutDriverInput | ServiceUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type RepairUpdateManyWithoutDriverNestedInput = {
    create?: XOR<RepairCreateWithoutDriverInput, RepairUncheckedCreateWithoutDriverInput> | RepairCreateWithoutDriverInput[] | RepairUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RepairCreateOrConnectWithoutDriverInput | RepairCreateOrConnectWithoutDriverInput[]
    upsert?: RepairUpsertWithWhereUniqueWithoutDriverInput | RepairUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: RepairCreateManyDriverInputEnvelope
    set?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    disconnect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    delete?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    connect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    update?: RepairUpdateWithWhereUniqueWithoutDriverInput | RepairUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: RepairUpdateManyWithWhereWithoutDriverInput | RepairUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: RepairScalarWhereInput | RepairScalarWhereInput[]
  }

  export type TruckDriverUpdateManyWithoutDriverNestedInput = {
    create?: XOR<TruckDriverCreateWithoutDriverInput, TruckDriverUncheckedCreateWithoutDriverInput> | TruckDriverCreateWithoutDriverInput[] | TruckDriverUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: TruckDriverCreateOrConnectWithoutDriverInput | TruckDriverCreateOrConnectWithoutDriverInput[]
    upsert?: TruckDriverUpsertWithWhereUniqueWithoutDriverInput | TruckDriverUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: TruckDriverCreateManyDriverInputEnvelope
    set?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    disconnect?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    delete?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    connect?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    update?: TruckDriverUpdateWithWhereUniqueWithoutDriverInput | TruckDriverUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: TruckDriverUpdateManyWithWhereWithoutDriverInput | TruckDriverUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: TruckDriverScalarWhereInput | TruckDriverScalarWhereInput[]
  }

  export type VehicleUncheckedUpdateOneWithoutDriverNestedInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput
    upsert?: VehicleUpsertWithoutDriverInput
    disconnect?: VehicleWhereInput | boolean
    delete?: VehicleWhereInput | boolean
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutDriverInput, VehicleUpdateWithoutDriverInput>, VehicleUncheckedUpdateWithoutDriverInput>
  }

  export type TripUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<TripCreateWithoutDriverInput, TripUncheckedCreateWithoutDriverInput> | TripCreateWithoutDriverInput[] | TripUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: TripCreateOrConnectWithoutDriverInput | TripCreateOrConnectWithoutDriverInput[]
    upsert?: TripUpsertWithWhereUniqueWithoutDriverInput | TripUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: TripCreateManyDriverInputEnvelope
    set?: TripWhereUniqueInput | TripWhereUniqueInput[]
    disconnect?: TripWhereUniqueInput | TripWhereUniqueInput[]
    delete?: TripWhereUniqueInput | TripWhereUniqueInput[]
    connect?: TripWhereUniqueInput | TripWhereUniqueInput[]
    update?: TripUpdateWithWhereUniqueWithoutDriverInput | TripUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: TripUpdateManyWithWhereWithoutDriverInput | TripUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: TripScalarWhereInput | TripScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<ServiceCreateWithoutDriverInput, ServiceUncheckedCreateWithoutDriverInput> | ServiceCreateWithoutDriverInput[] | ServiceUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutDriverInput | ServiceCreateOrConnectWithoutDriverInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutDriverInput | ServiceUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: ServiceCreateManyDriverInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutDriverInput | ServiceUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutDriverInput | ServiceUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type RepairUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<RepairCreateWithoutDriverInput, RepairUncheckedCreateWithoutDriverInput> | RepairCreateWithoutDriverInput[] | RepairUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RepairCreateOrConnectWithoutDriverInput | RepairCreateOrConnectWithoutDriverInput[]
    upsert?: RepairUpsertWithWhereUniqueWithoutDriverInput | RepairUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: RepairCreateManyDriverInputEnvelope
    set?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    disconnect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    delete?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    connect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    update?: RepairUpdateWithWhereUniqueWithoutDriverInput | RepairUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: RepairUpdateManyWithWhereWithoutDriverInput | RepairUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: RepairScalarWhereInput | RepairScalarWhereInput[]
  }

  export type TruckDriverUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<TruckDriverCreateWithoutDriverInput, TruckDriverUncheckedCreateWithoutDriverInput> | TruckDriverCreateWithoutDriverInput[] | TruckDriverUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: TruckDriverCreateOrConnectWithoutDriverInput | TruckDriverCreateOrConnectWithoutDriverInput[]
    upsert?: TruckDriverUpsertWithWhereUniqueWithoutDriverInput | TruckDriverUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: TruckDriverCreateManyDriverInputEnvelope
    set?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    disconnect?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    delete?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    connect?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    update?: TruckDriverUpdateWithWhereUniqueWithoutDriverInput | TruckDriverUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: TruckDriverUpdateManyWithWhereWithoutDriverInput | TruckDriverUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: TruckDriverScalarWhereInput | TruckDriverScalarWhereInput[]
  }

  export type DriverCreateNestedOneWithoutVehicleInput = {
    create?: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: DriverCreateOrConnectWithoutVehicleInput
    connect?: DriverWhereUniqueInput
  }

  export type TripCreateNestedManyWithoutVehicleInput = {
    create?: XOR<TripCreateWithoutVehicleInput, TripUncheckedCreateWithoutVehicleInput> | TripCreateWithoutVehicleInput[] | TripUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: TripCreateOrConnectWithoutVehicleInput | TripCreateOrConnectWithoutVehicleInput[]
    createMany?: TripCreateManyVehicleInputEnvelope
    connect?: TripWhereUniqueInput | TripWhereUniqueInput[]
  }

  export type TruckDriverCreateNestedManyWithoutVehicleInput = {
    create?: XOR<TruckDriverCreateWithoutVehicleInput, TruckDriverUncheckedCreateWithoutVehicleInput> | TruckDriverCreateWithoutVehicleInput[] | TruckDriverUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: TruckDriverCreateOrConnectWithoutVehicleInput | TruckDriverCreateOrConnectWithoutVehicleInput[]
    createMany?: TruckDriverCreateManyVehicleInputEnvelope
    connect?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutVehicleInput = {
    create?: XOR<ServiceCreateWithoutVehicleInput, ServiceUncheckedCreateWithoutVehicleInput> | ServiceCreateWithoutVehicleInput[] | ServiceUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutVehicleInput | ServiceCreateOrConnectWithoutVehicleInput[]
    createMany?: ServiceCreateManyVehicleInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type RepairCreateNestedManyWithoutVehicleInput = {
    create?: XOR<RepairCreateWithoutVehicleInput, RepairUncheckedCreateWithoutVehicleInput> | RepairCreateWithoutVehicleInput[] | RepairUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: RepairCreateOrConnectWithoutVehicleInput | RepairCreateOrConnectWithoutVehicleInput[]
    createMany?: RepairCreateManyVehicleInputEnvelope
    connect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
  }

  export type PartCreateNestedManyWithoutVehicleInput = {
    create?: XOR<PartCreateWithoutVehicleInput, PartUncheckedCreateWithoutVehicleInput> | PartCreateWithoutVehicleInput[] | PartUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: PartCreateOrConnectWithoutVehicleInput | PartCreateOrConnectWithoutVehicleInput[]
    createMany?: PartCreateManyVehicleInputEnvelope
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
  }

  export type TireCreateNestedManyWithoutVehicleInput = {
    create?: XOR<TireCreateWithoutVehicleInput, TireUncheckedCreateWithoutVehicleInput> | TireCreateWithoutVehicleInput[] | TireUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: TireCreateOrConnectWithoutVehicleInput | TireCreateOrConnectWithoutVehicleInput[]
    createMany?: TireCreateManyVehicleInputEnvelope
    connect?: TireWhereUniqueInput | TireWhereUniqueInput[]
  }

  export type TripUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<TripCreateWithoutVehicleInput, TripUncheckedCreateWithoutVehicleInput> | TripCreateWithoutVehicleInput[] | TripUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: TripCreateOrConnectWithoutVehicleInput | TripCreateOrConnectWithoutVehicleInput[]
    createMany?: TripCreateManyVehicleInputEnvelope
    connect?: TripWhereUniqueInput | TripWhereUniqueInput[]
  }

  export type TruckDriverUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<TruckDriverCreateWithoutVehicleInput, TruckDriverUncheckedCreateWithoutVehicleInput> | TruckDriverCreateWithoutVehicleInput[] | TruckDriverUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: TruckDriverCreateOrConnectWithoutVehicleInput | TruckDriverCreateOrConnectWithoutVehicleInput[]
    createMany?: TruckDriverCreateManyVehicleInputEnvelope
    connect?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<ServiceCreateWithoutVehicleInput, ServiceUncheckedCreateWithoutVehicleInput> | ServiceCreateWithoutVehicleInput[] | ServiceUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutVehicleInput | ServiceCreateOrConnectWithoutVehicleInput[]
    createMany?: ServiceCreateManyVehicleInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type RepairUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<RepairCreateWithoutVehicleInput, RepairUncheckedCreateWithoutVehicleInput> | RepairCreateWithoutVehicleInput[] | RepairUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: RepairCreateOrConnectWithoutVehicleInput | RepairCreateOrConnectWithoutVehicleInput[]
    createMany?: RepairCreateManyVehicleInputEnvelope
    connect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
  }

  export type PartUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<PartCreateWithoutVehicleInput, PartUncheckedCreateWithoutVehicleInput> | PartCreateWithoutVehicleInput[] | PartUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: PartCreateOrConnectWithoutVehicleInput | PartCreateOrConnectWithoutVehicleInput[]
    createMany?: PartCreateManyVehicleInputEnvelope
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
  }

  export type TireUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<TireCreateWithoutVehicleInput, TireUncheckedCreateWithoutVehicleInput> | TireCreateWithoutVehicleInput[] | TireUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: TireCreateOrConnectWithoutVehicleInput | TireCreateOrConnectWithoutVehicleInput[]
    createMany?: TireCreateManyVehicleInputEnvelope
    connect?: TireWhereUniqueInput | TireWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumFuelTypeFieldUpdateOperationsInput = {
    set?: $Enums.FuelType
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DriverUpdateOneWithoutVehicleNestedInput = {
    create?: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: DriverCreateOrConnectWithoutVehicleInput
    upsert?: DriverUpsertWithoutVehicleInput
    disconnect?: DriverWhereInput | boolean
    delete?: DriverWhereInput | boolean
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutVehicleInput, DriverUpdateWithoutVehicleInput>, DriverUncheckedUpdateWithoutVehicleInput>
  }

  export type TripUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<TripCreateWithoutVehicleInput, TripUncheckedCreateWithoutVehicleInput> | TripCreateWithoutVehicleInput[] | TripUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: TripCreateOrConnectWithoutVehicleInput | TripCreateOrConnectWithoutVehicleInput[]
    upsert?: TripUpsertWithWhereUniqueWithoutVehicleInput | TripUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: TripCreateManyVehicleInputEnvelope
    set?: TripWhereUniqueInput | TripWhereUniqueInput[]
    disconnect?: TripWhereUniqueInput | TripWhereUniqueInput[]
    delete?: TripWhereUniqueInput | TripWhereUniqueInput[]
    connect?: TripWhereUniqueInput | TripWhereUniqueInput[]
    update?: TripUpdateWithWhereUniqueWithoutVehicleInput | TripUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: TripUpdateManyWithWhereWithoutVehicleInput | TripUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: TripScalarWhereInput | TripScalarWhereInput[]
  }

  export type TruckDriverUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<TruckDriverCreateWithoutVehicleInput, TruckDriverUncheckedCreateWithoutVehicleInput> | TruckDriverCreateWithoutVehicleInput[] | TruckDriverUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: TruckDriverCreateOrConnectWithoutVehicleInput | TruckDriverCreateOrConnectWithoutVehicleInput[]
    upsert?: TruckDriverUpsertWithWhereUniqueWithoutVehicleInput | TruckDriverUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: TruckDriverCreateManyVehicleInputEnvelope
    set?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    disconnect?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    delete?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    connect?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    update?: TruckDriverUpdateWithWhereUniqueWithoutVehicleInput | TruckDriverUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: TruckDriverUpdateManyWithWhereWithoutVehicleInput | TruckDriverUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: TruckDriverScalarWhereInput | TruckDriverScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<ServiceCreateWithoutVehicleInput, ServiceUncheckedCreateWithoutVehicleInput> | ServiceCreateWithoutVehicleInput[] | ServiceUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutVehicleInput | ServiceCreateOrConnectWithoutVehicleInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutVehicleInput | ServiceUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: ServiceCreateManyVehicleInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutVehicleInput | ServiceUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutVehicleInput | ServiceUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type RepairUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<RepairCreateWithoutVehicleInput, RepairUncheckedCreateWithoutVehicleInput> | RepairCreateWithoutVehicleInput[] | RepairUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: RepairCreateOrConnectWithoutVehicleInput | RepairCreateOrConnectWithoutVehicleInput[]
    upsert?: RepairUpsertWithWhereUniqueWithoutVehicleInput | RepairUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: RepairCreateManyVehicleInputEnvelope
    set?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    disconnect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    delete?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    connect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    update?: RepairUpdateWithWhereUniqueWithoutVehicleInput | RepairUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: RepairUpdateManyWithWhereWithoutVehicleInput | RepairUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: RepairScalarWhereInput | RepairScalarWhereInput[]
  }

  export type PartUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<PartCreateWithoutVehicleInput, PartUncheckedCreateWithoutVehicleInput> | PartCreateWithoutVehicleInput[] | PartUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: PartCreateOrConnectWithoutVehicleInput | PartCreateOrConnectWithoutVehicleInput[]
    upsert?: PartUpsertWithWhereUniqueWithoutVehicleInput | PartUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: PartCreateManyVehicleInputEnvelope
    set?: PartWhereUniqueInput | PartWhereUniqueInput[]
    disconnect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    delete?: PartWhereUniqueInput | PartWhereUniqueInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    update?: PartUpdateWithWhereUniqueWithoutVehicleInput | PartUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: PartUpdateManyWithWhereWithoutVehicleInput | PartUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: PartScalarWhereInput | PartScalarWhereInput[]
  }

  export type TireUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<TireCreateWithoutVehicleInput, TireUncheckedCreateWithoutVehicleInput> | TireCreateWithoutVehicleInput[] | TireUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: TireCreateOrConnectWithoutVehicleInput | TireCreateOrConnectWithoutVehicleInput[]
    upsert?: TireUpsertWithWhereUniqueWithoutVehicleInput | TireUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: TireCreateManyVehicleInputEnvelope
    set?: TireWhereUniqueInput | TireWhereUniqueInput[]
    disconnect?: TireWhereUniqueInput | TireWhereUniqueInput[]
    delete?: TireWhereUniqueInput | TireWhereUniqueInput[]
    connect?: TireWhereUniqueInput | TireWhereUniqueInput[]
    update?: TireUpdateWithWhereUniqueWithoutVehicleInput | TireUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: TireUpdateManyWithWhereWithoutVehicleInput | TireUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: TireScalarWhereInput | TireScalarWhereInput[]
  }

  export type TripUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<TripCreateWithoutVehicleInput, TripUncheckedCreateWithoutVehicleInput> | TripCreateWithoutVehicleInput[] | TripUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: TripCreateOrConnectWithoutVehicleInput | TripCreateOrConnectWithoutVehicleInput[]
    upsert?: TripUpsertWithWhereUniqueWithoutVehicleInput | TripUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: TripCreateManyVehicleInputEnvelope
    set?: TripWhereUniqueInput | TripWhereUniqueInput[]
    disconnect?: TripWhereUniqueInput | TripWhereUniqueInput[]
    delete?: TripWhereUniqueInput | TripWhereUniqueInput[]
    connect?: TripWhereUniqueInput | TripWhereUniqueInput[]
    update?: TripUpdateWithWhereUniqueWithoutVehicleInput | TripUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: TripUpdateManyWithWhereWithoutVehicleInput | TripUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: TripScalarWhereInput | TripScalarWhereInput[]
  }

  export type TruckDriverUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<TruckDriverCreateWithoutVehicleInput, TruckDriverUncheckedCreateWithoutVehicleInput> | TruckDriverCreateWithoutVehicleInput[] | TruckDriverUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: TruckDriverCreateOrConnectWithoutVehicleInput | TruckDriverCreateOrConnectWithoutVehicleInput[]
    upsert?: TruckDriverUpsertWithWhereUniqueWithoutVehicleInput | TruckDriverUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: TruckDriverCreateManyVehicleInputEnvelope
    set?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    disconnect?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    delete?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    connect?: TruckDriverWhereUniqueInput | TruckDriverWhereUniqueInput[]
    update?: TruckDriverUpdateWithWhereUniqueWithoutVehicleInput | TruckDriverUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: TruckDriverUpdateManyWithWhereWithoutVehicleInput | TruckDriverUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: TruckDriverScalarWhereInput | TruckDriverScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<ServiceCreateWithoutVehicleInput, ServiceUncheckedCreateWithoutVehicleInput> | ServiceCreateWithoutVehicleInput[] | ServiceUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutVehicleInput | ServiceCreateOrConnectWithoutVehicleInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutVehicleInput | ServiceUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: ServiceCreateManyVehicleInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutVehicleInput | ServiceUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutVehicleInput | ServiceUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type RepairUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<RepairCreateWithoutVehicleInput, RepairUncheckedCreateWithoutVehicleInput> | RepairCreateWithoutVehicleInput[] | RepairUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: RepairCreateOrConnectWithoutVehicleInput | RepairCreateOrConnectWithoutVehicleInput[]
    upsert?: RepairUpsertWithWhereUniqueWithoutVehicleInput | RepairUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: RepairCreateManyVehicleInputEnvelope
    set?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    disconnect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    delete?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    connect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    update?: RepairUpdateWithWhereUniqueWithoutVehicleInput | RepairUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: RepairUpdateManyWithWhereWithoutVehicleInput | RepairUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: RepairScalarWhereInput | RepairScalarWhereInput[]
  }

  export type PartUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<PartCreateWithoutVehicleInput, PartUncheckedCreateWithoutVehicleInput> | PartCreateWithoutVehicleInput[] | PartUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: PartCreateOrConnectWithoutVehicleInput | PartCreateOrConnectWithoutVehicleInput[]
    upsert?: PartUpsertWithWhereUniqueWithoutVehicleInput | PartUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: PartCreateManyVehicleInputEnvelope
    set?: PartWhereUniqueInput | PartWhereUniqueInput[]
    disconnect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    delete?: PartWhereUniqueInput | PartWhereUniqueInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    update?: PartUpdateWithWhereUniqueWithoutVehicleInput | PartUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: PartUpdateManyWithWhereWithoutVehicleInput | PartUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: PartScalarWhereInput | PartScalarWhereInput[]
  }

  export type TireUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<TireCreateWithoutVehicleInput, TireUncheckedCreateWithoutVehicleInput> | TireCreateWithoutVehicleInput[] | TireUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: TireCreateOrConnectWithoutVehicleInput | TireCreateOrConnectWithoutVehicleInput[]
    upsert?: TireUpsertWithWhereUniqueWithoutVehicleInput | TireUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: TireCreateManyVehicleInputEnvelope
    set?: TireWhereUniqueInput | TireWhereUniqueInput[]
    disconnect?: TireWhereUniqueInput | TireWhereUniqueInput[]
    delete?: TireWhereUniqueInput | TireWhereUniqueInput[]
    connect?: TireWhereUniqueInput | TireWhereUniqueInput[]
    update?: TireUpdateWithWhereUniqueWithoutVehicleInput | TireUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: TireUpdateManyWithWhereWithoutVehicleInput | TireUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: TireScalarWhereInput | TireScalarWhereInput[]
  }

  export type VehicleCreateNestedOneWithoutTruckDriverInput = {
    create?: XOR<VehicleCreateWithoutTruckDriverInput, VehicleUncheckedCreateWithoutTruckDriverInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutTruckDriverInput
    connect?: VehicleWhereUniqueInput
  }

  export type DriverCreateNestedOneWithoutTruckDriverInput = {
    create?: XOR<DriverCreateWithoutTruckDriverInput, DriverUncheckedCreateWithoutTruckDriverInput>
    connectOrCreate?: DriverCreateOrConnectWithoutTruckDriverInput
    connect?: DriverWhereUniqueInput
  }

  export type VehicleUpdateOneRequiredWithoutTruckDriverNestedInput = {
    create?: XOR<VehicleCreateWithoutTruckDriverInput, VehicleUncheckedCreateWithoutTruckDriverInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutTruckDriverInput
    upsert?: VehicleUpsertWithoutTruckDriverInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutTruckDriverInput, VehicleUpdateWithoutTruckDriverInput>, VehicleUncheckedUpdateWithoutTruckDriverInput>
  }

  export type DriverUpdateOneRequiredWithoutTruckDriverNestedInput = {
    create?: XOR<DriverCreateWithoutTruckDriverInput, DriverUncheckedCreateWithoutTruckDriverInput>
    connectOrCreate?: DriverCreateOrConnectWithoutTruckDriverInput
    upsert?: DriverUpsertWithoutTruckDriverInput
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutTruckDriverInput, DriverUpdateWithoutTruckDriverInput>, DriverUncheckedUpdateWithoutTruckDriverInput>
  }

  export type CustomerCreateNestedManyWithoutTripInput = {
    create?: XOR<CustomerCreateWithoutTripInput, CustomerUncheckedCreateWithoutTripInput> | CustomerCreateWithoutTripInput[] | CustomerUncheckedCreateWithoutTripInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutTripInput | CustomerCreateOrConnectWithoutTripInput[]
    createMany?: CustomerCreateManyTripInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type VehicleCreateNestedOneWithoutTripsInput = {
    create?: XOR<VehicleCreateWithoutTripsInput, VehicleUncheckedCreateWithoutTripsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutTripsInput
    connect?: VehicleWhereUniqueInput
  }

  export type DriverCreateNestedOneWithoutTripsInput = {
    create?: XOR<DriverCreateWithoutTripsInput, DriverUncheckedCreateWithoutTripsInput>
    connectOrCreate?: DriverCreateOrConnectWithoutTripsInput
    connect?: DriverWhereUniqueInput
  }

  export type FuelCreateNestedManyWithoutTripInput = {
    create?: XOR<FuelCreateWithoutTripInput, FuelUncheckedCreateWithoutTripInput> | FuelCreateWithoutTripInput[] | FuelUncheckedCreateWithoutTripInput[]
    connectOrCreate?: FuelCreateOrConnectWithoutTripInput | FuelCreateOrConnectWithoutTripInput[]
    createMany?: FuelCreateManyTripInputEnvelope
    connect?: FuelWhereUniqueInput | FuelWhereUniqueInput[]
  }

  export type CustomerUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<CustomerCreateWithoutTripInput, CustomerUncheckedCreateWithoutTripInput> | CustomerCreateWithoutTripInput[] | CustomerUncheckedCreateWithoutTripInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutTripInput | CustomerCreateOrConnectWithoutTripInput[]
    createMany?: CustomerCreateManyTripInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type FuelUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<FuelCreateWithoutTripInput, FuelUncheckedCreateWithoutTripInput> | FuelCreateWithoutTripInput[] | FuelUncheckedCreateWithoutTripInput[]
    connectOrCreate?: FuelCreateOrConnectWithoutTripInput | FuelCreateOrConnectWithoutTripInput[]
    createMany?: FuelCreateManyTripInputEnvelope
    connect?: FuelWhereUniqueInput | FuelWhereUniqueInput[]
  }

  export type EnumTripStatusFieldUpdateOperationsInput = {
    set?: $Enums.TripStatus
  }

  export type CustomerUpdateManyWithoutTripNestedInput = {
    create?: XOR<CustomerCreateWithoutTripInput, CustomerUncheckedCreateWithoutTripInput> | CustomerCreateWithoutTripInput[] | CustomerUncheckedCreateWithoutTripInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutTripInput | CustomerCreateOrConnectWithoutTripInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutTripInput | CustomerUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: CustomerCreateManyTripInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutTripInput | CustomerUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutTripInput | CustomerUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type VehicleUpdateOneRequiredWithoutTripsNestedInput = {
    create?: XOR<VehicleCreateWithoutTripsInput, VehicleUncheckedCreateWithoutTripsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutTripsInput
    upsert?: VehicleUpsertWithoutTripsInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutTripsInput, VehicleUpdateWithoutTripsInput>, VehicleUncheckedUpdateWithoutTripsInput>
  }

  export type DriverUpdateOneRequiredWithoutTripsNestedInput = {
    create?: XOR<DriverCreateWithoutTripsInput, DriverUncheckedCreateWithoutTripsInput>
    connectOrCreate?: DriverCreateOrConnectWithoutTripsInput
    upsert?: DriverUpsertWithoutTripsInput
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutTripsInput, DriverUpdateWithoutTripsInput>, DriverUncheckedUpdateWithoutTripsInput>
  }

  export type FuelUpdateManyWithoutTripNestedInput = {
    create?: XOR<FuelCreateWithoutTripInput, FuelUncheckedCreateWithoutTripInput> | FuelCreateWithoutTripInput[] | FuelUncheckedCreateWithoutTripInput[]
    connectOrCreate?: FuelCreateOrConnectWithoutTripInput | FuelCreateOrConnectWithoutTripInput[]
    upsert?: FuelUpsertWithWhereUniqueWithoutTripInput | FuelUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: FuelCreateManyTripInputEnvelope
    set?: FuelWhereUniqueInput | FuelWhereUniqueInput[]
    disconnect?: FuelWhereUniqueInput | FuelWhereUniqueInput[]
    delete?: FuelWhereUniqueInput | FuelWhereUniqueInput[]
    connect?: FuelWhereUniqueInput | FuelWhereUniqueInput[]
    update?: FuelUpdateWithWhereUniqueWithoutTripInput | FuelUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: FuelUpdateManyWithWhereWithoutTripInput | FuelUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: FuelScalarWhereInput | FuelScalarWhereInput[]
  }

  export type CustomerUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<CustomerCreateWithoutTripInput, CustomerUncheckedCreateWithoutTripInput> | CustomerCreateWithoutTripInput[] | CustomerUncheckedCreateWithoutTripInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutTripInput | CustomerCreateOrConnectWithoutTripInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutTripInput | CustomerUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: CustomerCreateManyTripInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutTripInput | CustomerUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutTripInput | CustomerUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type FuelUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<FuelCreateWithoutTripInput, FuelUncheckedCreateWithoutTripInput> | FuelCreateWithoutTripInput[] | FuelUncheckedCreateWithoutTripInput[]
    connectOrCreate?: FuelCreateOrConnectWithoutTripInput | FuelCreateOrConnectWithoutTripInput[]
    upsert?: FuelUpsertWithWhereUniqueWithoutTripInput | FuelUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: FuelCreateManyTripInputEnvelope
    set?: FuelWhereUniqueInput | FuelWhereUniqueInput[]
    disconnect?: FuelWhereUniqueInput | FuelWhereUniqueInput[]
    delete?: FuelWhereUniqueInput | FuelWhereUniqueInput[]
    connect?: FuelWhereUniqueInput | FuelWhereUniqueInput[]
    update?: FuelUpdateWithWhereUniqueWithoutTripInput | FuelUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: FuelUpdateManyWithWhereWithoutTripInput | FuelUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: FuelScalarWhereInput | FuelScalarWhereInput[]
  }

  export type TripCreateNestedOneWithoutCustomerInput = {
    create?: XOR<TripCreateWithoutCustomerInput, TripUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: TripCreateOrConnectWithoutCustomerInput
    connect?: TripWhereUniqueInput
  }

  export type TripUpdateOneRequiredWithoutCustomerNestedInput = {
    create?: XOR<TripCreateWithoutCustomerInput, TripUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: TripCreateOrConnectWithoutCustomerInput
    upsert?: TripUpsertWithoutCustomerInput
    connect?: TripWhereUniqueInput
    update?: XOR<XOR<TripUpdateToOneWithWhereWithoutCustomerInput, TripUpdateWithoutCustomerInput>, TripUncheckedUpdateWithoutCustomerInput>
  }

  export type TripCreateNestedOneWithoutFuelsInput = {
    create?: XOR<TripCreateWithoutFuelsInput, TripUncheckedCreateWithoutFuelsInput>
    connectOrCreate?: TripCreateOrConnectWithoutFuelsInput
    connect?: TripWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TripUpdateOneRequiredWithoutFuelsNestedInput = {
    create?: XOR<TripCreateWithoutFuelsInput, TripUncheckedCreateWithoutFuelsInput>
    connectOrCreate?: TripCreateOrConnectWithoutFuelsInput
    upsert?: TripUpsertWithoutFuelsInput
    connect?: TripWhereUniqueInput
    update?: XOR<XOR<TripUpdateToOneWithWhereWithoutFuelsInput, TripUpdateWithoutFuelsInput>, TripUncheckedUpdateWithoutFuelsInput>
  }

  export type VehicleCreateNestedOneWithoutPartsInput = {
    create?: XOR<VehicleCreateWithoutPartsInput, VehicleUncheckedCreateWithoutPartsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutPartsInput
    connect?: VehicleWhereUniqueInput
  }

  export type RepairCreateNestedOneWithoutPartsInput = {
    create?: XOR<RepairCreateWithoutPartsInput, RepairUncheckedCreateWithoutPartsInput>
    connectOrCreate?: RepairCreateOrConnectWithoutPartsInput
    connect?: RepairWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VehicleUpdateOneRequiredWithoutPartsNestedInput = {
    create?: XOR<VehicleCreateWithoutPartsInput, VehicleUncheckedCreateWithoutPartsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutPartsInput
    upsert?: VehicleUpsertWithoutPartsInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutPartsInput, VehicleUpdateWithoutPartsInput>, VehicleUncheckedUpdateWithoutPartsInput>
  }

  export type RepairUpdateOneWithoutPartsNestedInput = {
    create?: XOR<RepairCreateWithoutPartsInput, RepairUncheckedCreateWithoutPartsInput>
    connectOrCreate?: RepairCreateOrConnectWithoutPartsInput
    upsert?: RepairUpsertWithoutPartsInput
    disconnect?: RepairWhereInput | boolean
    delete?: RepairWhereInput | boolean
    connect?: RepairWhereUniqueInput
    update?: XOR<XOR<RepairUpdateToOneWithWhereWithoutPartsInput, RepairUpdateWithoutPartsInput>, RepairUncheckedUpdateWithoutPartsInput>
  }

  export type VehicleCreateNestedOneWithoutServicesInput = {
    create?: XOR<VehicleCreateWithoutServicesInput, VehicleUncheckedCreateWithoutServicesInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutServicesInput
    connect?: VehicleWhereUniqueInput
  }

  export type DriverCreateNestedOneWithoutServicesInput = {
    create?: XOR<DriverCreateWithoutServicesInput, DriverUncheckedCreateWithoutServicesInput>
    connectOrCreate?: DriverCreateOrConnectWithoutServicesInput
    connect?: DriverWhereUniqueInput
  }

  export type EnumServiceTypeFieldUpdateOperationsInput = {
    set?: $Enums.ServiceType
  }

  export type EnumServiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.ServiceStatus
  }

  export type VehicleUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<VehicleCreateWithoutServicesInput, VehicleUncheckedCreateWithoutServicesInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutServicesInput
    upsert?: VehicleUpsertWithoutServicesInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutServicesInput, VehicleUpdateWithoutServicesInput>, VehicleUncheckedUpdateWithoutServicesInput>
  }

  export type DriverUpdateOneWithoutServicesNestedInput = {
    create?: XOR<DriverCreateWithoutServicesInput, DriverUncheckedCreateWithoutServicesInput>
    connectOrCreate?: DriverCreateOrConnectWithoutServicesInput
    upsert?: DriverUpsertWithoutServicesInput
    disconnect?: DriverWhereInput | boolean
    delete?: DriverWhereInput | boolean
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutServicesInput, DriverUpdateWithoutServicesInput>, DriverUncheckedUpdateWithoutServicesInput>
  }

  export type VehicleCreateNestedOneWithoutRepairsInput = {
    create?: XOR<VehicleCreateWithoutRepairsInput, VehicleUncheckedCreateWithoutRepairsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutRepairsInput
    connect?: VehicleWhereUniqueInput
  }

  export type DriverCreateNestedOneWithoutRepairsInput = {
    create?: XOR<DriverCreateWithoutRepairsInput, DriverUncheckedCreateWithoutRepairsInput>
    connectOrCreate?: DriverCreateOrConnectWithoutRepairsInput
    connect?: DriverWhereUniqueInput
  }

  export type PartCreateNestedManyWithoutRepairInput = {
    create?: XOR<PartCreateWithoutRepairInput, PartUncheckedCreateWithoutRepairInput> | PartCreateWithoutRepairInput[] | PartUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: PartCreateOrConnectWithoutRepairInput | PartCreateOrConnectWithoutRepairInput[]
    createMany?: PartCreateManyRepairInputEnvelope
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
  }

  export type PartUncheckedCreateNestedManyWithoutRepairInput = {
    create?: XOR<PartCreateWithoutRepairInput, PartUncheckedCreateWithoutRepairInput> | PartCreateWithoutRepairInput[] | PartUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: PartCreateOrConnectWithoutRepairInput | PartCreateOrConnectWithoutRepairInput[]
    createMany?: PartCreateManyRepairInputEnvelope
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
  }

  export type EnumRepairStatusFieldUpdateOperationsInput = {
    set?: $Enums.RepairStatus
  }

  export type EnumRepairPriorityFieldUpdateOperationsInput = {
    set?: $Enums.RepairPriority
  }

  export type VehicleUpdateOneRequiredWithoutRepairsNestedInput = {
    create?: XOR<VehicleCreateWithoutRepairsInput, VehicleUncheckedCreateWithoutRepairsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutRepairsInput
    upsert?: VehicleUpsertWithoutRepairsInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutRepairsInput, VehicleUpdateWithoutRepairsInput>, VehicleUncheckedUpdateWithoutRepairsInput>
  }

  export type DriverUpdateOneWithoutRepairsNestedInput = {
    create?: XOR<DriverCreateWithoutRepairsInput, DriverUncheckedCreateWithoutRepairsInput>
    connectOrCreate?: DriverCreateOrConnectWithoutRepairsInput
    upsert?: DriverUpsertWithoutRepairsInput
    disconnect?: DriverWhereInput | boolean
    delete?: DriverWhereInput | boolean
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutRepairsInput, DriverUpdateWithoutRepairsInput>, DriverUncheckedUpdateWithoutRepairsInput>
  }

  export type PartUpdateManyWithoutRepairNestedInput = {
    create?: XOR<PartCreateWithoutRepairInput, PartUncheckedCreateWithoutRepairInput> | PartCreateWithoutRepairInput[] | PartUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: PartCreateOrConnectWithoutRepairInput | PartCreateOrConnectWithoutRepairInput[]
    upsert?: PartUpsertWithWhereUniqueWithoutRepairInput | PartUpsertWithWhereUniqueWithoutRepairInput[]
    createMany?: PartCreateManyRepairInputEnvelope
    set?: PartWhereUniqueInput | PartWhereUniqueInput[]
    disconnect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    delete?: PartWhereUniqueInput | PartWhereUniqueInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    update?: PartUpdateWithWhereUniqueWithoutRepairInput | PartUpdateWithWhereUniqueWithoutRepairInput[]
    updateMany?: PartUpdateManyWithWhereWithoutRepairInput | PartUpdateManyWithWhereWithoutRepairInput[]
    deleteMany?: PartScalarWhereInput | PartScalarWhereInput[]
  }

  export type PartUncheckedUpdateManyWithoutRepairNestedInput = {
    create?: XOR<PartCreateWithoutRepairInput, PartUncheckedCreateWithoutRepairInput> | PartCreateWithoutRepairInput[] | PartUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: PartCreateOrConnectWithoutRepairInput | PartCreateOrConnectWithoutRepairInput[]
    upsert?: PartUpsertWithWhereUniqueWithoutRepairInput | PartUpsertWithWhereUniqueWithoutRepairInput[]
    createMany?: PartCreateManyRepairInputEnvelope
    set?: PartWhereUniqueInput | PartWhereUniqueInput[]
    disconnect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    delete?: PartWhereUniqueInput | PartWhereUniqueInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    update?: PartUpdateWithWhereUniqueWithoutRepairInput | PartUpdateWithWhereUniqueWithoutRepairInput[]
    updateMany?: PartUpdateManyWithWhereWithoutRepairInput | PartUpdateManyWithWhereWithoutRepairInput[]
    deleteMany?: PartScalarWhereInput | PartScalarWhereInput[]
  }

  export type VehicleCreateNestedOneWithoutTiresInput = {
    create?: XOR<VehicleCreateWithoutTiresInput, VehicleUncheckedCreateWithoutTiresInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutTiresInput
    connect?: VehicleWhereUniqueInput
  }

  export type EnumTirePositionFieldUpdateOperationsInput = {
    set?: $Enums.TirePosition
  }

  export type EnumTireStatusFieldUpdateOperationsInput = {
    set?: $Enums.TireStatus
  }

  export type VehicleUpdateOneRequiredWithoutTiresNestedInput = {
    create?: XOR<VehicleCreateWithoutTiresInput, VehicleUncheckedCreateWithoutTiresInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutTiresInput
    upsert?: VehicleUpsertWithoutTiresInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutTiresInput, VehicleUpdateWithoutTiresInput>, VehicleUncheckedUpdateWithoutTiresInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumFuelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FuelType | EnumFuelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FuelType[] | ListEnumFuelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FuelType[] | ListEnumFuelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFuelTypeFilter<$PrismaModel> | $Enums.FuelType
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumFuelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FuelType | EnumFuelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FuelType[] | ListEnumFuelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FuelType[] | ListEnumFuelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFuelTypeWithAggregatesFilter<$PrismaModel> | $Enums.FuelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFuelTypeFilter<$PrismaModel>
    _max?: NestedEnumFuelTypeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumTripStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TripStatus | EnumTripStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTripStatusFilter<$PrismaModel> | $Enums.TripStatus
  }

  export type NestedEnumTripStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripStatus | EnumTripStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTripStatusWithAggregatesFilter<$PrismaModel> | $Enums.TripStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTripStatusFilter<$PrismaModel>
    _max?: NestedEnumTripStatusFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeFilter<$PrismaModel> | $Enums.ServiceType
  }

  export type NestedEnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ServiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceTypeFilter<$PrismaModel>
    _max?: NestedEnumServiceTypeFilter<$PrismaModel>
  }

  export type NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type NestedEnumRepairStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairStatus | EnumRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRepairStatusFilter<$PrismaModel> | $Enums.RepairStatus
  }

  export type NestedEnumRepairPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairPriority | EnumRepairPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.RepairPriority[] | ListEnumRepairPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepairPriority[] | ListEnumRepairPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumRepairPriorityFilter<$PrismaModel> | $Enums.RepairPriority
  }

  export type NestedEnumRepairStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairStatus | EnumRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRepairStatusWithAggregatesFilter<$PrismaModel> | $Enums.RepairStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRepairStatusFilter<$PrismaModel>
    _max?: NestedEnumRepairStatusFilter<$PrismaModel>
  }

  export type NestedEnumRepairPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairPriority | EnumRepairPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.RepairPriority[] | ListEnumRepairPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepairPriority[] | ListEnumRepairPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumRepairPriorityWithAggregatesFilter<$PrismaModel> | $Enums.RepairPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRepairPriorityFilter<$PrismaModel>
    _max?: NestedEnumRepairPriorityFilter<$PrismaModel>
  }

  export type NestedEnumTirePositionFilter<$PrismaModel = never> = {
    equals?: $Enums.TirePosition | EnumTirePositionFieldRefInput<$PrismaModel>
    in?: $Enums.TirePosition[] | ListEnumTirePositionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TirePosition[] | ListEnumTirePositionFieldRefInput<$PrismaModel>
    not?: NestedEnumTirePositionFilter<$PrismaModel> | $Enums.TirePosition
  }

  export type NestedEnumTireStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TireStatus | EnumTireStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TireStatus[] | ListEnumTireStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TireStatus[] | ListEnumTireStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTireStatusFilter<$PrismaModel> | $Enums.TireStatus
  }

  export type NestedEnumTirePositionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TirePosition | EnumTirePositionFieldRefInput<$PrismaModel>
    in?: $Enums.TirePosition[] | ListEnumTirePositionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TirePosition[] | ListEnumTirePositionFieldRefInput<$PrismaModel>
    not?: NestedEnumTirePositionWithAggregatesFilter<$PrismaModel> | $Enums.TirePosition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTirePositionFilter<$PrismaModel>
    _max?: NestedEnumTirePositionFilter<$PrismaModel>
  }

  export type NestedEnumTireStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TireStatus | EnumTireStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TireStatus[] | ListEnumTireStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TireStatus[] | ListEnumTireStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTireStatusWithAggregatesFilter<$PrismaModel> | $Enums.TireStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTireStatusFilter<$PrismaModel>
    _max?: NestedEnumTireStatusFilter<$PrismaModel>
  }

  export type PasswordResetTokenCreateWithoutUserInput = {
    id?: string
    hashedToken: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUncheckedCreateWithoutUserInput = {
    id?: string
    hashedToken: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenCreateOrConnectWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokenUpsertWithoutUserInput = {
    update: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    where?: PasswordResetTokenWhereInput
  }

  export type PasswordResetTokenUpdateToOneWithWhereWithoutUserInput = {
    where?: PasswordResetTokenWhereInput
    data: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutPasswordResetInput = {
    id?: string
    email: string
    passwordChangedAt?: Date | string | null
    name?: string | null
    profileImage: string
    role: $Enums.Role
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUncheckedCreateWithoutPasswordResetInput = {
    id?: string
    email: string
    passwordChangedAt?: Date | string | null
    name?: string | null
    profileImage: string
    role: $Enums.Role
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserCreateOrConnectWithoutPasswordResetInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
  }

  export type UserUpsertWithoutPasswordResetInput = {
    update: XOR<UserUpdateWithoutPasswordResetInput, UserUncheckedUpdateWithoutPasswordResetInput>
    create: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetInput, UserUncheckedUpdateWithoutPasswordResetInput>
  }

  export type UserUpdateWithoutPasswordResetInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateWithoutPasswordResetInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VehicleCreateWithoutDriverInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    trips?: TripCreateNestedManyWithoutVehicleInput
    truckDriver?: TruckDriverCreateNestedManyWithoutVehicleInput
    services?: ServiceCreateNestedManyWithoutVehicleInput
    repairs?: RepairCreateNestedManyWithoutVehicleInput
    parts?: PartCreateNestedManyWithoutVehicleInput
    tires?: TireCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutDriverInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    trips?: TripUncheckedCreateNestedManyWithoutVehicleInput
    truckDriver?: TruckDriverUncheckedCreateNestedManyWithoutVehicleInput
    services?: ServiceUncheckedCreateNestedManyWithoutVehicleInput
    repairs?: RepairUncheckedCreateNestedManyWithoutVehicleInput
    parts?: PartUncheckedCreateNestedManyWithoutVehicleInput
    tires?: TireUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutDriverInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
  }

  export type TripCreateWithoutDriverInput = {
    id?: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedManyWithoutTripInput
    vehicle: VehicleCreateNestedOneWithoutTripsInput
    fuels?: FuelCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateWithoutDriverInput = {
    id?: string
    vehicleId: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedManyWithoutTripInput
    fuels?: FuelUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripCreateOrConnectWithoutDriverInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutDriverInput, TripUncheckedCreateWithoutDriverInput>
  }

  export type TripCreateManyDriverInputEnvelope = {
    data: TripCreateManyDriverInput | TripCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutDriverInput = {
    id?: string
    serviceType?: $Enums.ServiceType
    status?: $Enums.ServiceStatus
    description?: string | null
    odometerKm?: number | null
    nextServiceKm?: number | null
    nextServiceDate?: Date | string | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle: VehicleCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutDriverInput = {
    id?: string
    vehicleId: string
    serviceType?: $Enums.ServiceType
    status?: $Enums.ServiceStatus
    description?: string | null
    odometerKm?: number | null
    nextServiceKm?: number | null
    nextServiceDate?: Date | string | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ServiceCreateOrConnectWithoutDriverInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutDriverInput, ServiceUncheckedCreateWithoutDriverInput>
  }

  export type ServiceCreateManyDriverInputEnvelope = {
    data: ServiceCreateManyDriverInput | ServiceCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type RepairCreateWithoutDriverInput = {
    id?: string
    status?: $Enums.RepairStatus
    priority?: $Enums.RepairPriority
    faultDesc: string
    repairDesc?: string | null
    odometerKm?: number | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    reportedDate?: Date | string
    startedDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle: VehicleCreateNestedOneWithoutRepairsInput
    parts?: PartCreateNestedManyWithoutRepairInput
  }

  export type RepairUncheckedCreateWithoutDriverInput = {
    id?: string
    vehicleId: string
    status?: $Enums.RepairStatus
    priority?: $Enums.RepairPriority
    faultDesc: string
    repairDesc?: string | null
    odometerKm?: number | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    reportedDate?: Date | string
    startedDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parts?: PartUncheckedCreateNestedManyWithoutRepairInput
  }

  export type RepairCreateOrConnectWithoutDriverInput = {
    where: RepairWhereUniqueInput
    create: XOR<RepairCreateWithoutDriverInput, RepairUncheckedCreateWithoutDriverInput>
  }

  export type RepairCreateManyDriverInputEnvelope = {
    data: RepairCreateManyDriverInput | RepairCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type TruckDriverCreateWithoutDriverInput = {
    id?: string
    from?: Date | string | null
    to?: Date | string | null
    createdAt?: Date | string
    vehicle: VehicleCreateNestedOneWithoutTruckDriverInput
  }

  export type TruckDriverUncheckedCreateWithoutDriverInput = {
    id?: string
    vehicleId: string
    from?: Date | string | null
    to?: Date | string | null
    createdAt?: Date | string
  }

  export type TruckDriverCreateOrConnectWithoutDriverInput = {
    where: TruckDriverWhereUniqueInput
    create: XOR<TruckDriverCreateWithoutDriverInput, TruckDriverUncheckedCreateWithoutDriverInput>
  }

  export type TruckDriverCreateManyDriverInputEnvelope = {
    data: TruckDriverCreateManyDriverInput | TruckDriverCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type VehicleUpsertWithoutDriverInput = {
    update: XOR<VehicleUpdateWithoutDriverInput, VehicleUncheckedUpdateWithoutDriverInput>
    create: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutDriverInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutDriverInput, VehicleUncheckedUpdateWithoutDriverInput>
  }

  export type VehicleUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trips?: TripUpdateManyWithoutVehicleNestedInput
    truckDriver?: TruckDriverUpdateManyWithoutVehicleNestedInput
    services?: ServiceUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUpdateManyWithoutVehicleNestedInput
    parts?: PartUpdateManyWithoutVehicleNestedInput
    tires?: TireUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trips?: TripUncheckedUpdateManyWithoutVehicleNestedInput
    truckDriver?: TruckDriverUncheckedUpdateManyWithoutVehicleNestedInput
    services?: ServiceUncheckedUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutVehicleNestedInput
    parts?: PartUncheckedUpdateManyWithoutVehicleNestedInput
    tires?: TireUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type TripUpsertWithWhereUniqueWithoutDriverInput = {
    where: TripWhereUniqueInput
    update: XOR<TripUpdateWithoutDriverInput, TripUncheckedUpdateWithoutDriverInput>
    create: XOR<TripCreateWithoutDriverInput, TripUncheckedCreateWithoutDriverInput>
  }

  export type TripUpdateWithWhereUniqueWithoutDriverInput = {
    where: TripWhereUniqueInput
    data: XOR<TripUpdateWithoutDriverInput, TripUncheckedUpdateWithoutDriverInput>
  }

  export type TripUpdateManyWithWhereWithoutDriverInput = {
    where: TripScalarWhereInput
    data: XOR<TripUpdateManyMutationInput, TripUncheckedUpdateManyWithoutDriverInput>
  }

  export type TripScalarWhereInput = {
    AND?: TripScalarWhereInput | TripScalarWhereInput[]
    OR?: TripScalarWhereInput[]
    NOT?: TripScalarWhereInput | TripScalarWhereInput[]
    id?: StringFilter<"Trip"> | string
    vehicleId?: StringFilter<"Trip"> | string
    driverId?: StringFilter<"Trip"> | string
    loadingPlant?: StringFilter<"Trip"> | string
    waybill_no?: StringFilter<"Trip"> | string
    atcNo?: StringFilter<"Trip"> | string
    company?: StringNullableFilter<"Trip"> | string | null
    destination?: StringFilter<"Trip"> | string
    despatchDate?: DateTimeFilter<"Trip"> | Date | string
    uploadDate?: DateTimeFilter<"Trip"> | Date | string
    totaldistanceKm?: FloatNullableFilter<"Trip"> | number | null
    odoStart?: IntNullableFilter<"Trip"> | number | null
    odoEnd?: IntNullableFilter<"Trip"> | number | null
    totalFuelCost?: FloatNullableFilter<"Trip"> | number | null
    totalCO2Kg?: FloatNullableFilter<"Trip"> | number | null
    costPerKm?: FloatNullableFilter<"Trip"> | number | null
    status?: EnumTripStatusFilter<"Trip"> | $Enums.TripStatus
    notes?: StringNullableFilter<"Trip"> | string | null
    createdAt?: DateTimeFilter<"Trip"> | Date | string
    updatedAt?: DateTimeFilter<"Trip"> | Date | string
  }

  export type ServiceUpsertWithWhereUniqueWithoutDriverInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutDriverInput, ServiceUncheckedUpdateWithoutDriverInput>
    create: XOR<ServiceCreateWithoutDriverInput, ServiceUncheckedCreateWithoutDriverInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutDriverInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutDriverInput, ServiceUncheckedUpdateWithoutDriverInput>
  }

  export type ServiceUpdateManyWithWhereWithoutDriverInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutDriverInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    vehicleId?: StringFilter<"Service"> | string
    driverId?: StringNullableFilter<"Service"> | string | null
    serviceType?: EnumServiceTypeFilter<"Service"> | $Enums.ServiceType
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    description?: StringNullableFilter<"Service"> | string | null
    odometerKm?: IntNullableFilter<"Service"> | number | null
    nextServiceKm?: IntNullableFilter<"Service"> | number | null
    nextServiceDate?: DateTimeNullableFilter<"Service"> | Date | string | null
    laborCost?: FloatNullableFilter<"Service"> | number | null
    partsCost?: FloatNullableFilter<"Service"> | number | null
    totalCost?: FloatNullableFilter<"Service"> | number | null
    garage?: StringNullableFilter<"Service"> | string | null
    garagePhone?: StringNullableFilter<"Service"> | string | null
    scheduledDate?: DateTimeNullableFilter<"Service"> | Date | string | null
    completedDate?: DateTimeNullableFilter<"Service"> | Date | string | null
    notes?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Service"> | Date | string | null
  }

  export type RepairUpsertWithWhereUniqueWithoutDriverInput = {
    where: RepairWhereUniqueInput
    update: XOR<RepairUpdateWithoutDriverInput, RepairUncheckedUpdateWithoutDriverInput>
    create: XOR<RepairCreateWithoutDriverInput, RepairUncheckedCreateWithoutDriverInput>
  }

  export type RepairUpdateWithWhereUniqueWithoutDriverInput = {
    where: RepairWhereUniqueInput
    data: XOR<RepairUpdateWithoutDriverInput, RepairUncheckedUpdateWithoutDriverInput>
  }

  export type RepairUpdateManyWithWhereWithoutDriverInput = {
    where: RepairScalarWhereInput
    data: XOR<RepairUpdateManyMutationInput, RepairUncheckedUpdateManyWithoutDriverInput>
  }

  export type RepairScalarWhereInput = {
    AND?: RepairScalarWhereInput | RepairScalarWhereInput[]
    OR?: RepairScalarWhereInput[]
    NOT?: RepairScalarWhereInput | RepairScalarWhereInput[]
    id?: StringFilter<"Repair"> | string
    vehicleId?: StringFilter<"Repair"> | string
    driverId?: StringNullableFilter<"Repair"> | string | null
    status?: EnumRepairStatusFilter<"Repair"> | $Enums.RepairStatus
    priority?: EnumRepairPriorityFilter<"Repair"> | $Enums.RepairPriority
    faultDesc?: StringFilter<"Repair"> | string
    repairDesc?: StringNullableFilter<"Repair"> | string | null
    odometerKm?: IntNullableFilter<"Repair"> | number | null
    laborCost?: FloatNullableFilter<"Repair"> | number | null
    partsCost?: FloatNullableFilter<"Repair"> | number | null
    totalCost?: FloatNullableFilter<"Repair"> | number | null
    garage?: StringNullableFilter<"Repair"> | string | null
    garagePhone?: StringNullableFilter<"Repair"> | string | null
    reportedDate?: DateTimeFilter<"Repair"> | Date | string
    startedDate?: DateTimeNullableFilter<"Repair"> | Date | string | null
    completedDate?: DateTimeNullableFilter<"Repair"> | Date | string | null
    notes?: StringNullableFilter<"Repair"> | string | null
    createdAt?: DateTimeFilter<"Repair"> | Date | string
    updatedAt?: DateTimeFilter<"Repair"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Repair"> | Date | string | null
  }

  export type TruckDriverUpsertWithWhereUniqueWithoutDriverInput = {
    where: TruckDriverWhereUniqueInput
    update: XOR<TruckDriverUpdateWithoutDriverInput, TruckDriverUncheckedUpdateWithoutDriverInput>
    create: XOR<TruckDriverCreateWithoutDriverInput, TruckDriverUncheckedCreateWithoutDriverInput>
  }

  export type TruckDriverUpdateWithWhereUniqueWithoutDriverInput = {
    where: TruckDriverWhereUniqueInput
    data: XOR<TruckDriverUpdateWithoutDriverInput, TruckDriverUncheckedUpdateWithoutDriverInput>
  }

  export type TruckDriverUpdateManyWithWhereWithoutDriverInput = {
    where: TruckDriverScalarWhereInput
    data: XOR<TruckDriverUpdateManyMutationInput, TruckDriverUncheckedUpdateManyWithoutDriverInput>
  }

  export type TruckDriverScalarWhereInput = {
    AND?: TruckDriverScalarWhereInput | TruckDriverScalarWhereInput[]
    OR?: TruckDriverScalarWhereInput[]
    NOT?: TruckDriverScalarWhereInput | TruckDriverScalarWhereInput[]
    id?: StringFilter<"TruckDriver"> | string
    vehicleId?: StringFilter<"TruckDriver"> | string
    driverId?: StringFilter<"TruckDriver"> | string
    from?: DateTimeNullableFilter<"TruckDriver"> | Date | string | null
    to?: DateTimeNullableFilter<"TruckDriver"> | Date | string | null
    createdAt?: DateTimeFilter<"TruckDriver"> | Date | string
  }

  export type DriverCreateWithoutVehicleInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    trips?: TripCreateNestedManyWithoutDriverInput
    services?: ServiceCreateNestedManyWithoutDriverInput
    repairs?: RepairCreateNestedManyWithoutDriverInput
    truckDriver?: TruckDriverCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutVehicleInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    trips?: TripUncheckedCreateNestedManyWithoutDriverInput
    services?: ServiceUncheckedCreateNestedManyWithoutDriverInput
    repairs?: RepairUncheckedCreateNestedManyWithoutDriverInput
    truckDriver?: TruckDriverUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutVehicleInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
  }

  export type TripCreateWithoutVehicleInput = {
    id?: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedManyWithoutTripInput
    driver: DriverCreateNestedOneWithoutTripsInput
    fuels?: FuelCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateWithoutVehicleInput = {
    id?: string
    driverId: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedManyWithoutTripInput
    fuels?: FuelUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripCreateOrConnectWithoutVehicleInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutVehicleInput, TripUncheckedCreateWithoutVehicleInput>
  }

  export type TripCreateManyVehicleInputEnvelope = {
    data: TripCreateManyVehicleInput | TripCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type TruckDriverCreateWithoutVehicleInput = {
    id?: string
    from?: Date | string | null
    to?: Date | string | null
    createdAt?: Date | string
    driver: DriverCreateNestedOneWithoutTruckDriverInput
  }

  export type TruckDriverUncheckedCreateWithoutVehicleInput = {
    id?: string
    driverId: string
    from?: Date | string | null
    to?: Date | string | null
    createdAt?: Date | string
  }

  export type TruckDriverCreateOrConnectWithoutVehicleInput = {
    where: TruckDriverWhereUniqueInput
    create: XOR<TruckDriverCreateWithoutVehicleInput, TruckDriverUncheckedCreateWithoutVehicleInput>
  }

  export type TruckDriverCreateManyVehicleInputEnvelope = {
    data: TruckDriverCreateManyVehicleInput | TruckDriverCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutVehicleInput = {
    id?: string
    serviceType?: $Enums.ServiceType
    status?: $Enums.ServiceStatus
    description?: string | null
    odometerKm?: number | null
    nextServiceKm?: number | null
    nextServiceDate?: Date | string | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    driver?: DriverCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutVehicleInput = {
    id?: string
    driverId?: string | null
    serviceType?: $Enums.ServiceType
    status?: $Enums.ServiceStatus
    description?: string | null
    odometerKm?: number | null
    nextServiceKm?: number | null
    nextServiceDate?: Date | string | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ServiceCreateOrConnectWithoutVehicleInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutVehicleInput, ServiceUncheckedCreateWithoutVehicleInput>
  }

  export type ServiceCreateManyVehicleInputEnvelope = {
    data: ServiceCreateManyVehicleInput | ServiceCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type RepairCreateWithoutVehicleInput = {
    id?: string
    status?: $Enums.RepairStatus
    priority?: $Enums.RepairPriority
    faultDesc: string
    repairDesc?: string | null
    odometerKm?: number | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    reportedDate?: Date | string
    startedDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    driver?: DriverCreateNestedOneWithoutRepairsInput
    parts?: PartCreateNestedManyWithoutRepairInput
  }

  export type RepairUncheckedCreateWithoutVehicleInput = {
    id?: string
    driverId?: string | null
    status?: $Enums.RepairStatus
    priority?: $Enums.RepairPriority
    faultDesc: string
    repairDesc?: string | null
    odometerKm?: number | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    reportedDate?: Date | string
    startedDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parts?: PartUncheckedCreateNestedManyWithoutRepairInput
  }

  export type RepairCreateOrConnectWithoutVehicleInput = {
    where: RepairWhereUniqueInput
    create: XOR<RepairCreateWithoutVehicleInput, RepairUncheckedCreateWithoutVehicleInput>
  }

  export type RepairCreateManyVehicleInputEnvelope = {
    data: RepairCreateManyVehicleInput | RepairCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type PartCreateWithoutVehicleInput = {
    id?: string
    name: string
    partNumber?: string | null
    category?: string | null
    quantity?: number
    unitCost: number
    totalCost: number
    supplier?: string | null
    supplierPhone?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    warrantyExpiry?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    repair?: RepairCreateNestedOneWithoutPartsInput
  }

  export type PartUncheckedCreateWithoutVehicleInput = {
    id?: string
    repairId?: string | null
    name: string
    partNumber?: string | null
    category?: string | null
    quantity?: number
    unitCost: number
    totalCost: number
    supplier?: string | null
    supplierPhone?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    warrantyExpiry?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PartCreateOrConnectWithoutVehicleInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutVehicleInput, PartUncheckedCreateWithoutVehicleInput>
  }

  export type PartCreateManyVehicleInputEnvelope = {
    data: PartCreateManyVehicleInput | PartCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type TireCreateWithoutVehicleInput = {
    id?: string
    brand?: string | null
    size?: string | null
    serialNumber?: string | null
    position?: $Enums.TirePosition
    status?: $Enums.TireStatus
    fittedOdometerKm?: number | null
    removedOdometerKm?: number | null
    kmCovered?: number | null
    treadDepthMm?: number | null
    treadDepthAtRemoval?: number | null
    expectedLifeKm?: number | null
    unitCost?: number | null
    supplier?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    removedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type TireUncheckedCreateWithoutVehicleInput = {
    id?: string
    brand?: string | null
    size?: string | null
    serialNumber?: string | null
    position?: $Enums.TirePosition
    status?: $Enums.TireStatus
    fittedOdometerKm?: number | null
    removedOdometerKm?: number | null
    kmCovered?: number | null
    treadDepthMm?: number | null
    treadDepthAtRemoval?: number | null
    expectedLifeKm?: number | null
    unitCost?: number | null
    supplier?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    removedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type TireCreateOrConnectWithoutVehicleInput = {
    where: TireWhereUniqueInput
    create: XOR<TireCreateWithoutVehicleInput, TireUncheckedCreateWithoutVehicleInput>
  }

  export type TireCreateManyVehicleInputEnvelope = {
    data: TireCreateManyVehicleInput | TireCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type DriverUpsertWithoutVehicleInput = {
    update: XOR<DriverUpdateWithoutVehicleInput, DriverUncheckedUpdateWithoutVehicleInput>
    create: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutVehicleInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutVehicleInput, DriverUncheckedUpdateWithoutVehicleInput>
  }

  export type DriverUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trips?: TripUpdateManyWithoutDriverNestedInput
    services?: ServiceUpdateManyWithoutDriverNestedInput
    repairs?: RepairUpdateManyWithoutDriverNestedInput
    truckDriver?: TruckDriverUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trips?: TripUncheckedUpdateManyWithoutDriverNestedInput
    services?: ServiceUncheckedUpdateManyWithoutDriverNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutDriverNestedInput
    truckDriver?: TruckDriverUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type TripUpsertWithWhereUniqueWithoutVehicleInput = {
    where: TripWhereUniqueInput
    update: XOR<TripUpdateWithoutVehicleInput, TripUncheckedUpdateWithoutVehicleInput>
    create: XOR<TripCreateWithoutVehicleInput, TripUncheckedCreateWithoutVehicleInput>
  }

  export type TripUpdateWithWhereUniqueWithoutVehicleInput = {
    where: TripWhereUniqueInput
    data: XOR<TripUpdateWithoutVehicleInput, TripUncheckedUpdateWithoutVehicleInput>
  }

  export type TripUpdateManyWithWhereWithoutVehicleInput = {
    where: TripScalarWhereInput
    data: XOR<TripUpdateManyMutationInput, TripUncheckedUpdateManyWithoutVehicleInput>
  }

  export type TruckDriverUpsertWithWhereUniqueWithoutVehicleInput = {
    where: TruckDriverWhereUniqueInput
    update: XOR<TruckDriverUpdateWithoutVehicleInput, TruckDriverUncheckedUpdateWithoutVehicleInput>
    create: XOR<TruckDriverCreateWithoutVehicleInput, TruckDriverUncheckedCreateWithoutVehicleInput>
  }

  export type TruckDriverUpdateWithWhereUniqueWithoutVehicleInput = {
    where: TruckDriverWhereUniqueInput
    data: XOR<TruckDriverUpdateWithoutVehicleInput, TruckDriverUncheckedUpdateWithoutVehicleInput>
  }

  export type TruckDriverUpdateManyWithWhereWithoutVehicleInput = {
    where: TruckDriverScalarWhereInput
    data: XOR<TruckDriverUpdateManyMutationInput, TruckDriverUncheckedUpdateManyWithoutVehicleInput>
  }

  export type ServiceUpsertWithWhereUniqueWithoutVehicleInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutVehicleInput, ServiceUncheckedUpdateWithoutVehicleInput>
    create: XOR<ServiceCreateWithoutVehicleInput, ServiceUncheckedCreateWithoutVehicleInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutVehicleInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutVehicleInput, ServiceUncheckedUpdateWithoutVehicleInput>
  }

  export type ServiceUpdateManyWithWhereWithoutVehicleInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutVehicleInput>
  }

  export type RepairUpsertWithWhereUniqueWithoutVehicleInput = {
    where: RepairWhereUniqueInput
    update: XOR<RepairUpdateWithoutVehicleInput, RepairUncheckedUpdateWithoutVehicleInput>
    create: XOR<RepairCreateWithoutVehicleInput, RepairUncheckedCreateWithoutVehicleInput>
  }

  export type RepairUpdateWithWhereUniqueWithoutVehicleInput = {
    where: RepairWhereUniqueInput
    data: XOR<RepairUpdateWithoutVehicleInput, RepairUncheckedUpdateWithoutVehicleInput>
  }

  export type RepairUpdateManyWithWhereWithoutVehicleInput = {
    where: RepairScalarWhereInput
    data: XOR<RepairUpdateManyMutationInput, RepairUncheckedUpdateManyWithoutVehicleInput>
  }

  export type PartUpsertWithWhereUniqueWithoutVehicleInput = {
    where: PartWhereUniqueInput
    update: XOR<PartUpdateWithoutVehicleInput, PartUncheckedUpdateWithoutVehicleInput>
    create: XOR<PartCreateWithoutVehicleInput, PartUncheckedCreateWithoutVehicleInput>
  }

  export type PartUpdateWithWhereUniqueWithoutVehicleInput = {
    where: PartWhereUniqueInput
    data: XOR<PartUpdateWithoutVehicleInput, PartUncheckedUpdateWithoutVehicleInput>
  }

  export type PartUpdateManyWithWhereWithoutVehicleInput = {
    where: PartScalarWhereInput
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyWithoutVehicleInput>
  }

  export type PartScalarWhereInput = {
    AND?: PartScalarWhereInput | PartScalarWhereInput[]
    OR?: PartScalarWhereInput[]
    NOT?: PartScalarWhereInput | PartScalarWhereInput[]
    id?: StringFilter<"Part"> | string
    vehicleId?: StringFilter<"Part"> | string
    repairId?: StringNullableFilter<"Part"> | string | null
    name?: StringFilter<"Part"> | string
    partNumber?: StringNullableFilter<"Part"> | string | null
    category?: StringNullableFilter<"Part"> | string | null
    quantity?: IntFilter<"Part"> | number
    unitCost?: FloatFilter<"Part"> | number
    totalCost?: FloatFilter<"Part"> | number
    supplier?: StringNullableFilter<"Part"> | string | null
    supplierPhone?: StringNullableFilter<"Part"> | string | null
    purchaseDate?: DateTimeNullableFilter<"Part"> | Date | string | null
    fittedDate?: DateTimeNullableFilter<"Part"> | Date | string | null
    warrantyExpiry?: DateTimeNullableFilter<"Part"> | Date | string | null
    notes?: StringNullableFilter<"Part"> | string | null
    createdAt?: DateTimeFilter<"Part"> | Date | string
    updatedAt?: DateTimeFilter<"Part"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Part"> | Date | string | null
  }

  export type TireUpsertWithWhereUniqueWithoutVehicleInput = {
    where: TireWhereUniqueInput
    update: XOR<TireUpdateWithoutVehicleInput, TireUncheckedUpdateWithoutVehicleInput>
    create: XOR<TireCreateWithoutVehicleInput, TireUncheckedCreateWithoutVehicleInput>
  }

  export type TireUpdateWithWhereUniqueWithoutVehicleInput = {
    where: TireWhereUniqueInput
    data: XOR<TireUpdateWithoutVehicleInput, TireUncheckedUpdateWithoutVehicleInput>
  }

  export type TireUpdateManyWithWhereWithoutVehicleInput = {
    where: TireScalarWhereInput
    data: XOR<TireUpdateManyMutationInput, TireUncheckedUpdateManyWithoutVehicleInput>
  }

  export type TireScalarWhereInput = {
    AND?: TireScalarWhereInput | TireScalarWhereInput[]
    OR?: TireScalarWhereInput[]
    NOT?: TireScalarWhereInput | TireScalarWhereInput[]
    id?: StringFilter<"Tire"> | string
    vehicleId?: StringFilter<"Tire"> | string
    brand?: StringNullableFilter<"Tire"> | string | null
    size?: StringNullableFilter<"Tire"> | string | null
    serialNumber?: StringNullableFilter<"Tire"> | string | null
    position?: EnumTirePositionFilter<"Tire"> | $Enums.TirePosition
    status?: EnumTireStatusFilter<"Tire"> | $Enums.TireStatus
    fittedOdometerKm?: IntNullableFilter<"Tire"> | number | null
    removedOdometerKm?: IntNullableFilter<"Tire"> | number | null
    kmCovered?: IntNullableFilter<"Tire"> | number | null
    treadDepthMm?: FloatNullableFilter<"Tire"> | number | null
    treadDepthAtRemoval?: FloatNullableFilter<"Tire"> | number | null
    expectedLifeKm?: IntNullableFilter<"Tire"> | number | null
    unitCost?: FloatNullableFilter<"Tire"> | number | null
    supplier?: StringNullableFilter<"Tire"> | string | null
    purchaseDate?: DateTimeNullableFilter<"Tire"> | Date | string | null
    fittedDate?: DateTimeNullableFilter<"Tire"> | Date | string | null
    removedDate?: DateTimeNullableFilter<"Tire"> | Date | string | null
    notes?: StringNullableFilter<"Tire"> | string | null
    createdAt?: DateTimeFilter<"Tire"> | Date | string
    updatedAt?: DateTimeFilter<"Tire"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Tire"> | Date | string | null
  }

  export type VehicleCreateWithoutTruckDriverInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    driver?: DriverCreateNestedOneWithoutVehicleInput
    trips?: TripCreateNestedManyWithoutVehicleInput
    services?: ServiceCreateNestedManyWithoutVehicleInput
    repairs?: RepairCreateNestedManyWithoutVehicleInput
    parts?: PartCreateNestedManyWithoutVehicleInput
    tires?: TireCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutTruckDriverInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    driverId?: string | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    trips?: TripUncheckedCreateNestedManyWithoutVehicleInput
    services?: ServiceUncheckedCreateNestedManyWithoutVehicleInput
    repairs?: RepairUncheckedCreateNestedManyWithoutVehicleInput
    parts?: PartUncheckedCreateNestedManyWithoutVehicleInput
    tires?: TireUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutTruckDriverInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutTruckDriverInput, VehicleUncheckedCreateWithoutTruckDriverInput>
  }

  export type DriverCreateWithoutTruckDriverInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle?: VehicleCreateNestedOneWithoutDriverInput
    trips?: TripCreateNestedManyWithoutDriverInput
    services?: ServiceCreateNestedManyWithoutDriverInput
    repairs?: RepairCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutTruckDriverInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle?: VehicleUncheckedCreateNestedOneWithoutDriverInput
    trips?: TripUncheckedCreateNestedManyWithoutDriverInput
    services?: ServiceUncheckedCreateNestedManyWithoutDriverInput
    repairs?: RepairUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutTruckDriverInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutTruckDriverInput, DriverUncheckedCreateWithoutTruckDriverInput>
  }

  export type VehicleUpsertWithoutTruckDriverInput = {
    update: XOR<VehicleUpdateWithoutTruckDriverInput, VehicleUncheckedUpdateWithoutTruckDriverInput>
    create: XOR<VehicleCreateWithoutTruckDriverInput, VehicleUncheckedCreateWithoutTruckDriverInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutTruckDriverInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutTruckDriverInput, VehicleUncheckedUpdateWithoutTruckDriverInput>
  }

  export type VehicleUpdateWithoutTruckDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver?: DriverUpdateOneWithoutVehicleNestedInput
    trips?: TripUpdateManyWithoutVehicleNestedInput
    services?: ServiceUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUpdateManyWithoutVehicleNestedInput
    parts?: PartUpdateManyWithoutVehicleNestedInput
    tires?: TireUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutTruckDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trips?: TripUncheckedUpdateManyWithoutVehicleNestedInput
    services?: ServiceUncheckedUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutVehicleNestedInput
    parts?: PartUncheckedUpdateManyWithoutVehicleNestedInput
    tires?: TireUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type DriverUpsertWithoutTruckDriverInput = {
    update: XOR<DriverUpdateWithoutTruckDriverInput, DriverUncheckedUpdateWithoutTruckDriverInput>
    create: XOR<DriverCreateWithoutTruckDriverInput, DriverUncheckedCreateWithoutTruckDriverInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutTruckDriverInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutTruckDriverInput, DriverUncheckedUpdateWithoutTruckDriverInput>
  }

  export type DriverUpdateWithoutTruckDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneWithoutDriverNestedInput
    trips?: TripUpdateManyWithoutDriverNestedInput
    services?: ServiceUpdateManyWithoutDriverNestedInput
    repairs?: RepairUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutTruckDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUncheckedUpdateOneWithoutDriverNestedInput
    trips?: TripUncheckedUpdateManyWithoutDriverNestedInput
    services?: ServiceUncheckedUpdateManyWithoutDriverNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type CustomerCreateWithoutTripInput = {
    id?: string
    customerName: string
    company: string
    noOfBags?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUncheckedCreateWithoutTripInput = {
    id?: string
    customerName: string
    company: string
    noOfBags?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerCreateOrConnectWithoutTripInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutTripInput, CustomerUncheckedCreateWithoutTripInput>
  }

  export type CustomerCreateManyTripInputEnvelope = {
    data: CustomerCreateManyTripInput | CustomerCreateManyTripInput[]
    skipDuplicates?: boolean
  }

  export type VehicleCreateWithoutTripsInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    driver?: DriverCreateNestedOneWithoutVehicleInput
    truckDriver?: TruckDriverCreateNestedManyWithoutVehicleInput
    services?: ServiceCreateNestedManyWithoutVehicleInput
    repairs?: RepairCreateNestedManyWithoutVehicleInput
    parts?: PartCreateNestedManyWithoutVehicleInput
    tires?: TireCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutTripsInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    driverId?: string | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    truckDriver?: TruckDriverUncheckedCreateNestedManyWithoutVehicleInput
    services?: ServiceUncheckedCreateNestedManyWithoutVehicleInput
    repairs?: RepairUncheckedCreateNestedManyWithoutVehicleInput
    parts?: PartUncheckedCreateNestedManyWithoutVehicleInput
    tires?: TireUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutTripsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutTripsInput, VehicleUncheckedCreateWithoutTripsInput>
  }

  export type DriverCreateWithoutTripsInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle?: VehicleCreateNestedOneWithoutDriverInput
    services?: ServiceCreateNestedManyWithoutDriverInput
    repairs?: RepairCreateNestedManyWithoutDriverInput
    truckDriver?: TruckDriverCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutTripsInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle?: VehicleUncheckedCreateNestedOneWithoutDriverInput
    services?: ServiceUncheckedCreateNestedManyWithoutDriverInput
    repairs?: RepairUncheckedCreateNestedManyWithoutDriverInput
    truckDriver?: TruckDriverUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutTripsInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutTripsInput, DriverUncheckedCreateWithoutTripsInput>
  }

  export type FuelCreateWithoutTripInput = {
    id?: string
    type: $Enums.FuelType
    qtyGiven: number
    unit: string
    unitPrice?: number | null
    fuelCost?: number | null
    distanceKm?: number | null
    estimatedCO2?: number | null
    dieselEquivalentL?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FuelUncheckedCreateWithoutTripInput = {
    id?: string
    type: $Enums.FuelType
    qtyGiven: number
    unit: string
    unitPrice?: number | null
    fuelCost?: number | null
    distanceKm?: number | null
    estimatedCO2?: number | null
    dieselEquivalentL?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FuelCreateOrConnectWithoutTripInput = {
    where: FuelWhereUniqueInput
    create: XOR<FuelCreateWithoutTripInput, FuelUncheckedCreateWithoutTripInput>
  }

  export type FuelCreateManyTripInputEnvelope = {
    data: FuelCreateManyTripInput | FuelCreateManyTripInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithWhereUniqueWithoutTripInput = {
    where: CustomerWhereUniqueInput
    update: XOR<CustomerUpdateWithoutTripInput, CustomerUncheckedUpdateWithoutTripInput>
    create: XOR<CustomerCreateWithoutTripInput, CustomerUncheckedCreateWithoutTripInput>
  }

  export type CustomerUpdateWithWhereUniqueWithoutTripInput = {
    where: CustomerWhereUniqueInput
    data: XOR<CustomerUpdateWithoutTripInput, CustomerUncheckedUpdateWithoutTripInput>
  }

  export type CustomerUpdateManyWithWhereWithoutTripInput = {
    where: CustomerScalarWhereInput
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyWithoutTripInput>
  }

  export type CustomerScalarWhereInput = {
    AND?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    OR?: CustomerScalarWhereInput[]
    NOT?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    id?: StringFilter<"Customer"> | string
    customerName?: StringFilter<"Customer"> | string
    tripId?: StringFilter<"Customer"> | string
    company?: StringFilter<"Customer"> | string
    noOfBags?: IntNullableFilter<"Customer"> | number | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
  }

  export type VehicleUpsertWithoutTripsInput = {
    update: XOR<VehicleUpdateWithoutTripsInput, VehicleUncheckedUpdateWithoutTripsInput>
    create: XOR<VehicleCreateWithoutTripsInput, VehicleUncheckedCreateWithoutTripsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutTripsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutTripsInput, VehicleUncheckedUpdateWithoutTripsInput>
  }

  export type VehicleUpdateWithoutTripsInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver?: DriverUpdateOneWithoutVehicleNestedInput
    truckDriver?: TruckDriverUpdateManyWithoutVehicleNestedInput
    services?: ServiceUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUpdateManyWithoutVehicleNestedInput
    parts?: PartUpdateManyWithoutVehicleNestedInput
    tires?: TireUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutTripsInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    truckDriver?: TruckDriverUncheckedUpdateManyWithoutVehicleNestedInput
    services?: ServiceUncheckedUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutVehicleNestedInput
    parts?: PartUncheckedUpdateManyWithoutVehicleNestedInput
    tires?: TireUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type DriverUpsertWithoutTripsInput = {
    update: XOR<DriverUpdateWithoutTripsInput, DriverUncheckedUpdateWithoutTripsInput>
    create: XOR<DriverCreateWithoutTripsInput, DriverUncheckedCreateWithoutTripsInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutTripsInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutTripsInput, DriverUncheckedUpdateWithoutTripsInput>
  }

  export type DriverUpdateWithoutTripsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneWithoutDriverNestedInput
    services?: ServiceUpdateManyWithoutDriverNestedInput
    repairs?: RepairUpdateManyWithoutDriverNestedInput
    truckDriver?: TruckDriverUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutTripsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUncheckedUpdateOneWithoutDriverNestedInput
    services?: ServiceUncheckedUpdateManyWithoutDriverNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutDriverNestedInput
    truckDriver?: TruckDriverUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type FuelUpsertWithWhereUniqueWithoutTripInput = {
    where: FuelWhereUniqueInput
    update: XOR<FuelUpdateWithoutTripInput, FuelUncheckedUpdateWithoutTripInput>
    create: XOR<FuelCreateWithoutTripInput, FuelUncheckedCreateWithoutTripInput>
  }

  export type FuelUpdateWithWhereUniqueWithoutTripInput = {
    where: FuelWhereUniqueInput
    data: XOR<FuelUpdateWithoutTripInput, FuelUncheckedUpdateWithoutTripInput>
  }

  export type FuelUpdateManyWithWhereWithoutTripInput = {
    where: FuelScalarWhereInput
    data: XOR<FuelUpdateManyMutationInput, FuelUncheckedUpdateManyWithoutTripInput>
  }

  export type FuelScalarWhereInput = {
    AND?: FuelScalarWhereInput | FuelScalarWhereInput[]
    OR?: FuelScalarWhereInput[]
    NOT?: FuelScalarWhereInput | FuelScalarWhereInput[]
    id?: StringFilter<"Fuel"> | string
    type?: EnumFuelTypeFilter<"Fuel"> | $Enums.FuelType
    tripId?: StringFilter<"Fuel"> | string
    qtyGiven?: FloatFilter<"Fuel"> | number
    unit?: StringFilter<"Fuel"> | string
    unitPrice?: FloatNullableFilter<"Fuel"> | number | null
    fuelCost?: FloatNullableFilter<"Fuel"> | number | null
    distanceKm?: FloatNullableFilter<"Fuel"> | number | null
    estimatedCO2?: FloatNullableFilter<"Fuel"> | number | null
    dieselEquivalentL?: FloatNullableFilter<"Fuel"> | number | null
    createdAt?: DateTimeFilter<"Fuel"> | Date | string
    updatedAt?: DateTimeFilter<"Fuel"> | Date | string
  }

  export type TripCreateWithoutCustomerInput = {
    id?: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicle: VehicleCreateNestedOneWithoutTripsInput
    driver: DriverCreateNestedOneWithoutTripsInput
    fuels?: FuelCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateWithoutCustomerInput = {
    id?: string
    vehicleId: string
    driverId: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fuels?: FuelUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripCreateOrConnectWithoutCustomerInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutCustomerInput, TripUncheckedCreateWithoutCustomerInput>
  }

  export type TripUpsertWithoutCustomerInput = {
    update: XOR<TripUpdateWithoutCustomerInput, TripUncheckedUpdateWithoutCustomerInput>
    create: XOR<TripCreateWithoutCustomerInput, TripUncheckedCreateWithoutCustomerInput>
    where?: TripWhereInput
  }

  export type TripUpdateToOneWithWhereWithoutCustomerInput = {
    where?: TripWhereInput
    data: XOR<TripUpdateWithoutCustomerInput, TripUncheckedUpdateWithoutCustomerInput>
  }

  export type TripUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutTripsNestedInput
    driver?: DriverUpdateOneRequiredWithoutTripsNestedInput
    fuels?: FuelUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fuels?: FuelUncheckedUpdateManyWithoutTripNestedInput
  }

  export type TripCreateWithoutFuelsInput = {
    id?: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedManyWithoutTripInput
    vehicle: VehicleCreateNestedOneWithoutTripsInput
    driver: DriverCreateNestedOneWithoutTripsInput
  }

  export type TripUncheckedCreateWithoutFuelsInput = {
    id?: string
    vehicleId: string
    driverId: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripCreateOrConnectWithoutFuelsInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutFuelsInput, TripUncheckedCreateWithoutFuelsInput>
  }

  export type TripUpsertWithoutFuelsInput = {
    update: XOR<TripUpdateWithoutFuelsInput, TripUncheckedUpdateWithoutFuelsInput>
    create: XOR<TripCreateWithoutFuelsInput, TripUncheckedCreateWithoutFuelsInput>
    where?: TripWhereInput
  }

  export type TripUpdateToOneWithWhereWithoutFuelsInput = {
    where?: TripWhereInput
    data: XOR<TripUpdateWithoutFuelsInput, TripUncheckedUpdateWithoutFuelsInput>
  }

  export type TripUpdateWithoutFuelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateManyWithoutTripNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutTripsNestedInput
    driver?: DriverUpdateOneRequiredWithoutTripsNestedInput
  }

  export type TripUncheckedUpdateWithoutFuelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateManyWithoutTripNestedInput
  }

  export type VehicleCreateWithoutPartsInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    driver?: DriverCreateNestedOneWithoutVehicleInput
    trips?: TripCreateNestedManyWithoutVehicleInput
    truckDriver?: TruckDriverCreateNestedManyWithoutVehicleInput
    services?: ServiceCreateNestedManyWithoutVehicleInput
    repairs?: RepairCreateNestedManyWithoutVehicleInput
    tires?: TireCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutPartsInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    driverId?: string | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    trips?: TripUncheckedCreateNestedManyWithoutVehicleInput
    truckDriver?: TruckDriverUncheckedCreateNestedManyWithoutVehicleInput
    services?: ServiceUncheckedCreateNestedManyWithoutVehicleInput
    repairs?: RepairUncheckedCreateNestedManyWithoutVehicleInput
    tires?: TireUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutPartsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutPartsInput, VehicleUncheckedCreateWithoutPartsInput>
  }

  export type RepairCreateWithoutPartsInput = {
    id?: string
    status?: $Enums.RepairStatus
    priority?: $Enums.RepairPriority
    faultDesc: string
    repairDesc?: string | null
    odometerKm?: number | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    reportedDate?: Date | string
    startedDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle: VehicleCreateNestedOneWithoutRepairsInput
    driver?: DriverCreateNestedOneWithoutRepairsInput
  }

  export type RepairUncheckedCreateWithoutPartsInput = {
    id?: string
    vehicleId: string
    driverId?: string | null
    status?: $Enums.RepairStatus
    priority?: $Enums.RepairPriority
    faultDesc: string
    repairDesc?: string | null
    odometerKm?: number | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    reportedDate?: Date | string
    startedDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type RepairCreateOrConnectWithoutPartsInput = {
    where: RepairWhereUniqueInput
    create: XOR<RepairCreateWithoutPartsInput, RepairUncheckedCreateWithoutPartsInput>
  }

  export type VehicleUpsertWithoutPartsInput = {
    update: XOR<VehicleUpdateWithoutPartsInput, VehicleUncheckedUpdateWithoutPartsInput>
    create: XOR<VehicleCreateWithoutPartsInput, VehicleUncheckedCreateWithoutPartsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutPartsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutPartsInput, VehicleUncheckedUpdateWithoutPartsInput>
  }

  export type VehicleUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver?: DriverUpdateOneWithoutVehicleNestedInput
    trips?: TripUpdateManyWithoutVehicleNestedInput
    truckDriver?: TruckDriverUpdateManyWithoutVehicleNestedInput
    services?: ServiceUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUpdateManyWithoutVehicleNestedInput
    tires?: TireUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trips?: TripUncheckedUpdateManyWithoutVehicleNestedInput
    truckDriver?: TruckDriverUncheckedUpdateManyWithoutVehicleNestedInput
    services?: ServiceUncheckedUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutVehicleNestedInput
    tires?: TireUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type RepairUpsertWithoutPartsInput = {
    update: XOR<RepairUpdateWithoutPartsInput, RepairUncheckedUpdateWithoutPartsInput>
    create: XOR<RepairCreateWithoutPartsInput, RepairUncheckedCreateWithoutPartsInput>
    where?: RepairWhereInput
  }

  export type RepairUpdateToOneWithWhereWithoutPartsInput = {
    where?: RepairWhereInput
    data: XOR<RepairUpdateWithoutPartsInput, RepairUncheckedUpdateWithoutPartsInput>
  }

  export type RepairUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    priority?: EnumRepairPriorityFieldUpdateOperationsInput | $Enums.RepairPriority
    faultDesc?: StringFieldUpdateOperationsInput | string
    repairDesc?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    reportedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneRequiredWithoutRepairsNestedInput
    driver?: DriverUpdateOneWithoutRepairsNestedInput
  }

  export type RepairUncheckedUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    priority?: EnumRepairPriorityFieldUpdateOperationsInput | $Enums.RepairPriority
    faultDesc?: StringFieldUpdateOperationsInput | string
    repairDesc?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    reportedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VehicleCreateWithoutServicesInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    driver?: DriverCreateNestedOneWithoutVehicleInput
    trips?: TripCreateNestedManyWithoutVehicleInput
    truckDriver?: TruckDriverCreateNestedManyWithoutVehicleInput
    repairs?: RepairCreateNestedManyWithoutVehicleInput
    parts?: PartCreateNestedManyWithoutVehicleInput
    tires?: TireCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutServicesInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    driverId?: string | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    trips?: TripUncheckedCreateNestedManyWithoutVehicleInput
    truckDriver?: TruckDriverUncheckedCreateNestedManyWithoutVehicleInput
    repairs?: RepairUncheckedCreateNestedManyWithoutVehicleInput
    parts?: PartUncheckedCreateNestedManyWithoutVehicleInput
    tires?: TireUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutServicesInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutServicesInput, VehicleUncheckedCreateWithoutServicesInput>
  }

  export type DriverCreateWithoutServicesInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle?: VehicleCreateNestedOneWithoutDriverInput
    trips?: TripCreateNestedManyWithoutDriverInput
    repairs?: RepairCreateNestedManyWithoutDriverInput
    truckDriver?: TruckDriverCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutServicesInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle?: VehicleUncheckedCreateNestedOneWithoutDriverInput
    trips?: TripUncheckedCreateNestedManyWithoutDriverInput
    repairs?: RepairUncheckedCreateNestedManyWithoutDriverInput
    truckDriver?: TruckDriverUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutServicesInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutServicesInput, DriverUncheckedCreateWithoutServicesInput>
  }

  export type VehicleUpsertWithoutServicesInput = {
    update: XOR<VehicleUpdateWithoutServicesInput, VehicleUncheckedUpdateWithoutServicesInput>
    create: XOR<VehicleCreateWithoutServicesInput, VehicleUncheckedCreateWithoutServicesInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutServicesInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutServicesInput, VehicleUncheckedUpdateWithoutServicesInput>
  }

  export type VehicleUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver?: DriverUpdateOneWithoutVehicleNestedInput
    trips?: TripUpdateManyWithoutVehicleNestedInput
    truckDriver?: TruckDriverUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUpdateManyWithoutVehicleNestedInput
    parts?: PartUpdateManyWithoutVehicleNestedInput
    tires?: TireUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trips?: TripUncheckedUpdateManyWithoutVehicleNestedInput
    truckDriver?: TruckDriverUncheckedUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutVehicleNestedInput
    parts?: PartUncheckedUpdateManyWithoutVehicleNestedInput
    tires?: TireUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type DriverUpsertWithoutServicesInput = {
    update: XOR<DriverUpdateWithoutServicesInput, DriverUncheckedUpdateWithoutServicesInput>
    create: XOR<DriverCreateWithoutServicesInput, DriverUncheckedCreateWithoutServicesInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutServicesInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutServicesInput, DriverUncheckedUpdateWithoutServicesInput>
  }

  export type DriverUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneWithoutDriverNestedInput
    trips?: TripUpdateManyWithoutDriverNestedInput
    repairs?: RepairUpdateManyWithoutDriverNestedInput
    truckDriver?: TruckDriverUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUncheckedUpdateOneWithoutDriverNestedInput
    trips?: TripUncheckedUpdateManyWithoutDriverNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutDriverNestedInput
    truckDriver?: TruckDriverUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type VehicleCreateWithoutRepairsInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    driver?: DriverCreateNestedOneWithoutVehicleInput
    trips?: TripCreateNestedManyWithoutVehicleInput
    truckDriver?: TruckDriverCreateNestedManyWithoutVehicleInput
    services?: ServiceCreateNestedManyWithoutVehicleInput
    parts?: PartCreateNestedManyWithoutVehicleInput
    tires?: TireCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutRepairsInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    driverId?: string | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    trips?: TripUncheckedCreateNestedManyWithoutVehicleInput
    truckDriver?: TruckDriverUncheckedCreateNestedManyWithoutVehicleInput
    services?: ServiceUncheckedCreateNestedManyWithoutVehicleInput
    parts?: PartUncheckedCreateNestedManyWithoutVehicleInput
    tires?: TireUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutRepairsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutRepairsInput, VehicleUncheckedCreateWithoutRepairsInput>
  }

  export type DriverCreateWithoutRepairsInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle?: VehicleCreateNestedOneWithoutDriverInput
    trips?: TripCreateNestedManyWithoutDriverInput
    services?: ServiceCreateNestedManyWithoutDriverInput
    truckDriver?: TruckDriverCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutRepairsInput = {
    id?: string
    name: string
    phone?: string | null
    address: string
    profileImage: string
    licenseNo?: string | null
    licenseExp?: Date | string | null
    licenseImage: string
    accountName: string
    accountNumber: string
    bank: string
    guarantorForm: string
    fingerPrint: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle?: VehicleUncheckedCreateNestedOneWithoutDriverInput
    trips?: TripUncheckedCreateNestedManyWithoutDriverInput
    services?: ServiceUncheckedCreateNestedManyWithoutDriverInput
    truckDriver?: TruckDriverUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutRepairsInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutRepairsInput, DriverUncheckedCreateWithoutRepairsInput>
  }

  export type PartCreateWithoutRepairInput = {
    id?: string
    name: string
    partNumber?: string | null
    category?: string | null
    quantity?: number
    unitCost: number
    totalCost: number
    supplier?: string | null
    supplierPhone?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    warrantyExpiry?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    vehicle: VehicleCreateNestedOneWithoutPartsInput
  }

  export type PartUncheckedCreateWithoutRepairInput = {
    id?: string
    vehicleId: string
    name: string
    partNumber?: string | null
    category?: string | null
    quantity?: number
    unitCost: number
    totalCost: number
    supplier?: string | null
    supplierPhone?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    warrantyExpiry?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PartCreateOrConnectWithoutRepairInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutRepairInput, PartUncheckedCreateWithoutRepairInput>
  }

  export type PartCreateManyRepairInputEnvelope = {
    data: PartCreateManyRepairInput | PartCreateManyRepairInput[]
    skipDuplicates?: boolean
  }

  export type VehicleUpsertWithoutRepairsInput = {
    update: XOR<VehicleUpdateWithoutRepairsInput, VehicleUncheckedUpdateWithoutRepairsInput>
    create: XOR<VehicleCreateWithoutRepairsInput, VehicleUncheckedCreateWithoutRepairsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutRepairsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutRepairsInput, VehicleUncheckedUpdateWithoutRepairsInput>
  }

  export type VehicleUpdateWithoutRepairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver?: DriverUpdateOneWithoutVehicleNestedInput
    trips?: TripUpdateManyWithoutVehicleNestedInput
    truckDriver?: TruckDriverUpdateManyWithoutVehicleNestedInput
    services?: ServiceUpdateManyWithoutVehicleNestedInput
    parts?: PartUpdateManyWithoutVehicleNestedInput
    tires?: TireUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutRepairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trips?: TripUncheckedUpdateManyWithoutVehicleNestedInput
    truckDriver?: TruckDriverUncheckedUpdateManyWithoutVehicleNestedInput
    services?: ServiceUncheckedUpdateManyWithoutVehicleNestedInput
    parts?: PartUncheckedUpdateManyWithoutVehicleNestedInput
    tires?: TireUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type DriverUpsertWithoutRepairsInput = {
    update: XOR<DriverUpdateWithoutRepairsInput, DriverUncheckedUpdateWithoutRepairsInput>
    create: XOR<DriverCreateWithoutRepairsInput, DriverUncheckedCreateWithoutRepairsInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutRepairsInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutRepairsInput, DriverUncheckedUpdateWithoutRepairsInput>
  }

  export type DriverUpdateWithoutRepairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneWithoutDriverNestedInput
    trips?: TripUpdateManyWithoutDriverNestedInput
    services?: ServiceUpdateManyWithoutDriverNestedInput
    truckDriver?: TruckDriverUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutRepairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    profileImage?: StringFieldUpdateOperationsInput | string
    licenseNo?: NullableStringFieldUpdateOperationsInput | string | null
    licenseExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    licenseImage?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bank?: StringFieldUpdateOperationsInput | string
    guarantorForm?: StringFieldUpdateOperationsInput | string
    fingerPrint?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUncheckedUpdateOneWithoutDriverNestedInput
    trips?: TripUncheckedUpdateManyWithoutDriverNestedInput
    services?: ServiceUncheckedUpdateManyWithoutDriverNestedInput
    truckDriver?: TruckDriverUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type PartUpsertWithWhereUniqueWithoutRepairInput = {
    where: PartWhereUniqueInput
    update: XOR<PartUpdateWithoutRepairInput, PartUncheckedUpdateWithoutRepairInput>
    create: XOR<PartCreateWithoutRepairInput, PartUncheckedCreateWithoutRepairInput>
  }

  export type PartUpdateWithWhereUniqueWithoutRepairInput = {
    where: PartWhereUniqueInput
    data: XOR<PartUpdateWithoutRepairInput, PartUncheckedUpdateWithoutRepairInput>
  }

  export type PartUpdateManyWithWhereWithoutRepairInput = {
    where: PartScalarWhereInput
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyWithoutRepairInput>
  }

  export type VehicleCreateWithoutTiresInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    driver?: DriverCreateNestedOneWithoutVehicleInput
    trips?: TripCreateNestedManyWithoutVehicleInput
    truckDriver?: TruckDriverCreateNestedManyWithoutVehicleInput
    services?: ServiceCreateNestedManyWithoutVehicleInput
    repairs?: RepairCreateNestedManyWithoutVehicleInput
    parts?: PartCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutTiresInput = {
    id?: string
    vin?: string | null
    plateNumber: string
    cap_no: string
    make?: string | null
    vehicleImg?: string | null
    model?: string | null
    year?: number | null
    fuelType?: $Enums.FuelType
    fuelEfficiencyKmPerUnit?: number | null
    driverId?: string | null
    currentOdo?: number | null
    createdAt?: Date | string
    asssignDate?: Date | string | null
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    trips?: TripUncheckedCreateNestedManyWithoutVehicleInput
    truckDriver?: TruckDriverUncheckedCreateNestedManyWithoutVehicleInput
    services?: ServiceUncheckedCreateNestedManyWithoutVehicleInput
    repairs?: RepairUncheckedCreateNestedManyWithoutVehicleInput
    parts?: PartUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutTiresInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutTiresInput, VehicleUncheckedCreateWithoutTiresInput>
  }

  export type VehicleUpsertWithoutTiresInput = {
    update: XOR<VehicleUpdateWithoutTiresInput, VehicleUncheckedUpdateWithoutTiresInput>
    create: XOR<VehicleCreateWithoutTiresInput, VehicleUncheckedCreateWithoutTiresInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutTiresInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutTiresInput, VehicleUncheckedUpdateWithoutTiresInput>
  }

  export type VehicleUpdateWithoutTiresInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver?: DriverUpdateOneWithoutVehicleNestedInput
    trips?: TripUpdateManyWithoutVehicleNestedInput
    truckDriver?: TruckDriverUpdateManyWithoutVehicleNestedInput
    services?: ServiceUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUpdateManyWithoutVehicleNestedInput
    parts?: PartUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutTiresInput = {
    id?: StringFieldUpdateOperationsInput | string
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    plateNumber?: StringFieldUpdateOperationsInput | string
    cap_no?: StringFieldUpdateOperationsInput | string
    make?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleImg?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    fuelType?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    fuelEfficiencyKmPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    currentOdo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    asssignDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trips?: TripUncheckedUpdateManyWithoutVehicleNestedInput
    truckDriver?: TruckDriverUncheckedUpdateManyWithoutVehicleNestedInput
    services?: ServiceUncheckedUpdateManyWithoutVehicleNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutVehicleNestedInput
    parts?: PartUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type TripCreateManyDriverInput = {
    id?: string
    vehicleId: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateManyDriverInput = {
    id?: string
    vehicleId: string
    serviceType?: $Enums.ServiceType
    status?: $Enums.ServiceStatus
    description?: string | null
    odometerKm?: number | null
    nextServiceKm?: number | null
    nextServiceDate?: Date | string | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type RepairCreateManyDriverInput = {
    id?: string
    vehicleId: string
    status?: $Enums.RepairStatus
    priority?: $Enums.RepairPriority
    faultDesc: string
    repairDesc?: string | null
    odometerKm?: number | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    reportedDate?: Date | string
    startedDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type TruckDriverCreateManyDriverInput = {
    id?: string
    vehicleId: string
    from?: Date | string | null
    to?: Date | string | null
    createdAt?: Date | string
  }

  export type TripUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateManyWithoutTripNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutTripsNestedInput
    fuels?: FuelUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateManyWithoutTripNestedInput
    fuels?: FuelUncheckedUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneRequiredWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ServiceUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RepairUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    priority?: EnumRepairPriorityFieldUpdateOperationsInput | $Enums.RepairPriority
    faultDesc?: StringFieldUpdateOperationsInput | string
    repairDesc?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    reportedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneRequiredWithoutRepairsNestedInput
    parts?: PartUpdateManyWithoutRepairNestedInput
  }

  export type RepairUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    priority?: EnumRepairPriorityFieldUpdateOperationsInput | $Enums.RepairPriority
    faultDesc?: StringFieldUpdateOperationsInput | string
    repairDesc?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    reportedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parts?: PartUncheckedUpdateManyWithoutRepairNestedInput
  }

  export type RepairUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    priority?: EnumRepairPriorityFieldUpdateOperationsInput | $Enums.RepairPriority
    faultDesc?: StringFieldUpdateOperationsInput | string
    repairDesc?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    reportedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TruckDriverUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutTruckDriverNestedInput
  }

  export type TruckDriverUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TruckDriverUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripCreateManyVehicleInput = {
    id?: string
    driverId: string
    loadingPlant: string
    waybill_no: string
    atcNo: string
    company?: string | null
    destination: string
    despatchDate: Date | string
    uploadDate?: Date | string
    totaldistanceKm?: number | null
    odoStart?: number | null
    odoEnd?: number | null
    totalFuelCost?: number | null
    totalCO2Kg?: number | null
    costPerKm?: number | null
    status?: $Enums.TripStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TruckDriverCreateManyVehicleInput = {
    id?: string
    driverId: string
    from?: Date | string | null
    to?: Date | string | null
    createdAt?: Date | string
  }

  export type ServiceCreateManyVehicleInput = {
    id?: string
    driverId?: string | null
    serviceType?: $Enums.ServiceType
    status?: $Enums.ServiceStatus
    description?: string | null
    odometerKm?: number | null
    nextServiceKm?: number | null
    nextServiceDate?: Date | string | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type RepairCreateManyVehicleInput = {
    id?: string
    driverId?: string | null
    status?: $Enums.RepairStatus
    priority?: $Enums.RepairPriority
    faultDesc: string
    repairDesc?: string | null
    odometerKm?: number | null
    laborCost?: number | null
    partsCost?: number | null
    totalCost?: number | null
    garage?: string | null
    garagePhone?: string | null
    reportedDate?: Date | string
    startedDate?: Date | string | null
    completedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PartCreateManyVehicleInput = {
    id?: string
    repairId?: string | null
    name: string
    partNumber?: string | null
    category?: string | null
    quantity?: number
    unitCost: number
    totalCost: number
    supplier?: string | null
    supplierPhone?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    warrantyExpiry?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type TireCreateManyVehicleInput = {
    id?: string
    brand?: string | null
    size?: string | null
    serialNumber?: string | null
    position?: $Enums.TirePosition
    status?: $Enums.TireStatus
    fittedOdometerKm?: number | null
    removedOdometerKm?: number | null
    kmCovered?: number | null
    treadDepthMm?: number | null
    treadDepthAtRemoval?: number | null
    expectedLifeKm?: number | null
    unitCost?: number | null
    supplier?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    removedDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type TripUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateManyWithoutTripNestedInput
    driver?: DriverUpdateOneRequiredWithoutTripsNestedInput
    fuels?: FuelUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateManyWithoutTripNestedInput
    fuels?: FuelUncheckedUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    loadingPlant?: StringFieldUpdateOperationsInput | string
    waybill_no?: StringFieldUpdateOperationsInput | string
    atcNo?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    despatchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totaldistanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    odoStart?: NullableIntFieldUpdateOperationsInput | number | null
    odoEnd?: NullableIntFieldUpdateOperationsInput | number | null
    totalFuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCO2Kg?: NullableFloatFieldUpdateOperationsInput | number | null
    costPerKm?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TruckDriverUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUpdateOneRequiredWithoutTruckDriverNestedInput
  }

  export type TruckDriverUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TruckDriverUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver?: DriverUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ServiceUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceKm?: NullableIntFieldUpdateOperationsInput | number | null
    nextServiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RepairUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    priority?: EnumRepairPriorityFieldUpdateOperationsInput | $Enums.RepairPriority
    faultDesc?: StringFieldUpdateOperationsInput | string
    repairDesc?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    reportedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver?: DriverUpdateOneWithoutRepairsNestedInput
    parts?: PartUpdateManyWithoutRepairNestedInput
  }

  export type RepairUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    priority?: EnumRepairPriorityFieldUpdateOperationsInput | $Enums.RepairPriority
    faultDesc?: StringFieldUpdateOperationsInput | string
    repairDesc?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    reportedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parts?: PartUncheckedUpdateManyWithoutRepairNestedInput
  }

  export type RepairUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    priority?: EnumRepairPriorityFieldUpdateOperationsInput | $Enums.RepairPriority
    faultDesc?: StringFieldUpdateOperationsInput | string
    repairDesc?: NullableStringFieldUpdateOperationsInput | string | null
    odometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    laborCost?: NullableFloatFieldUpdateOperationsInput | number | null
    partsCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    garage?: NullableStringFieldUpdateOperationsInput | string | null
    garagePhone?: NullableStringFieldUpdateOperationsInput | string | null
    reportedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PartUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierPhone?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repair?: RepairUpdateOneWithoutPartsNestedInput
  }

  export type PartUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierPhone?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PartUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierPhone?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TireUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    position?: EnumTirePositionFieldUpdateOperationsInput | $Enums.TirePosition
    status?: EnumTireStatusFieldUpdateOperationsInput | $Enums.TireStatus
    fittedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    removedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    kmCovered?: NullableIntFieldUpdateOperationsInput | number | null
    treadDepthMm?: NullableFloatFieldUpdateOperationsInput | number | null
    treadDepthAtRemoval?: NullableFloatFieldUpdateOperationsInput | number | null
    expectedLifeKm?: NullableIntFieldUpdateOperationsInput | number | null
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TireUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    position?: EnumTirePositionFieldUpdateOperationsInput | $Enums.TirePosition
    status?: EnumTireStatusFieldUpdateOperationsInput | $Enums.TireStatus
    fittedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    removedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    kmCovered?: NullableIntFieldUpdateOperationsInput | number | null
    treadDepthMm?: NullableFloatFieldUpdateOperationsInput | number | null
    treadDepthAtRemoval?: NullableFloatFieldUpdateOperationsInput | number | null
    expectedLifeKm?: NullableIntFieldUpdateOperationsInput | number | null
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TireUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    position?: EnumTirePositionFieldUpdateOperationsInput | $Enums.TirePosition
    status?: EnumTireStatusFieldUpdateOperationsInput | $Enums.TireStatus
    fittedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    removedOdometerKm?: NullableIntFieldUpdateOperationsInput | number | null
    kmCovered?: NullableIntFieldUpdateOperationsInput | number | null
    treadDepthMm?: NullableFloatFieldUpdateOperationsInput | number | null
    treadDepthAtRemoval?: NullableFloatFieldUpdateOperationsInput | number | null
    expectedLifeKm?: NullableIntFieldUpdateOperationsInput | number | null
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CustomerCreateManyTripInput = {
    id?: string
    customerName: string
    company: string
    noOfBags?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FuelCreateManyTripInput = {
    id?: string
    type: $Enums.FuelType
    qtyGiven: number
    unit: string
    unitPrice?: number | null
    fuelCost?: number | null
    distanceKm?: number | null
    estimatedCO2?: number | null
    dieselEquivalentL?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    noOfBags?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    noOfBags?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    noOfBags?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    qtyGiven?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    fuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    estimatedCO2?: NullableFloatFieldUpdateOperationsInput | number | null
    dieselEquivalentL?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelUncheckedUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    qtyGiven?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    fuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    estimatedCO2?: NullableFloatFieldUpdateOperationsInput | number | null
    dieselEquivalentL?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelUncheckedUpdateManyWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType
    qtyGiven?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    fuelCost?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    estimatedCO2?: NullableFloatFieldUpdateOperationsInput | number | null
    dieselEquivalentL?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartCreateManyRepairInput = {
    id?: string
    vehicleId: string
    name: string
    partNumber?: string | null
    category?: string | null
    quantity?: number
    unitCost: number
    totalCost: number
    supplier?: string | null
    supplierPhone?: string | null
    purchaseDate?: Date | string | null
    fittedDate?: Date | string | null
    warrantyExpiry?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PartUpdateWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierPhone?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneRequiredWithoutPartsNestedInput
  }

  export type PartUncheckedUpdateWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierPhone?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PartUncheckedUpdateManyWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierPhone?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fittedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}