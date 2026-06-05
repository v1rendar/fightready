import { defineConfig } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  schema: 'prisma/schema.prisma',
  migrate: {
    url: "postgresql://postgres.znebzbcaebmgitygysbx:Lvscb3knKVIPCX6v@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres",
  },
})
