import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class DatabaseConfigs implements TypeOrmOptionsFactory {

    constructor(private configsService: ConfigService) { }

    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configsService.get("MY_SQL_HOST"),
            port: this.configsService.get<number>("MY_SQL_PORT"),
            username: this.configsService.get("MY_SQL_USERNAME"),
            password: this.configsService.get("MY_SQL_PASSWORD"),
            database: this.configsService.get("MY_SQL_DATABASE"),
            synchronize: this.configsService.get<boolean>('MY_SQL_SYNCHORNIZE'),
            autoLoadEntities: true,

        }
    }
}
