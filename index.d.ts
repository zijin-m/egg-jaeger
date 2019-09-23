import { TracingConfig } from 'jaeger-client';

interface EggJaegerTracingConfig extends TracingConfig {
  middlewareIndex?: number;
  sequelize?: boolean;
  redis?: boolean;
}

declare module 'egg' {
  // 扩展你的配置
  interface EggAppConfig {
    jaeger: EggJaegerTracingConfig;
  }
}
