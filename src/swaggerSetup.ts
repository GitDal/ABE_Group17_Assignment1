import SwaggerJSDoc from 'swagger-jsdoc';

//SETUP SWAGGER
const swaggerDefinition: SwaggerJSDoc.SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API to manage hotels',
        version: '1.0.0',
        description: 'This is a REST API application made with Express via TypeScript.',
        contact: {
            name: 'Mikkel Kousgaard Rasmussen',
            email: '201805606@uni.au.dk'
        },
        servers: [{
            url: 'http://localhost:3000',
            description: 'Development server'
        }]
    },
};
const options: SwaggerJSDoc.Options = {
    definition: swaggerDefinition,
    //Path to files containing OpenAPI definitions
    apis: ['**/*.ts'] //skal måske pege på controllers (og med .ts istedet?)
}
const swaggerSpec = SwaggerJSDoc(options);

export default swaggerSpec;