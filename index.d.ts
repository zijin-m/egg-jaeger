declare module 'egg-jaeger' {
  export function httpRpc(
    name?: string
  ): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
}
