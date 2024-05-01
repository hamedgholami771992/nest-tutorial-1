import { registerAs } from "@nestjs/config";


//registers a namespace config object under the key passed as first argument
//so we have to use ConfigModule.forFeature() to load this partial config
export default registerAs('coffees', () => ({
    foo: "bar"
}))