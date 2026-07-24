import { db } from "./index";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { config } from "dotenv";

config({ path: ".env.local" });

const main = async() =>{
    try{
        await migrate(db, {
            migrationsFolder: 'db/migrations'
        })
        console.log("migration completed");
    } catch(error) {
        console.log('error during migration:', error);
        process.exit(1);
    }
}

main()