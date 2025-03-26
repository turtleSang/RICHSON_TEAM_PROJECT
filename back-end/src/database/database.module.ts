import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfigs } from "./database.config";

@Module({
    imports: [TypeOrmModule.forRootAsync({ useClass: DatabaseConfigs })],
    exports: [TypeOrmModule]
})
export class DatabaseModule { }