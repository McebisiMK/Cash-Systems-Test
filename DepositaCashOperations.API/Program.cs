using DepositaCashOperations.API.GraphQL.Queries;
using DepositaCashOperations.Application;
using HotChocolate;
using HotChocolate.Data;
using DepositaCashOperations.Infrastructure;
using DepositaCashOperations.Infrastructure.DataSeeding;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Error = DepositaCashOperations.Application.Common.Models.Error;
using DepositaCashOperations.Infrastructure.Persistence;
using DepositaCashOperations.API.GraphQL.Mutations;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddOptions();
builder.Services
        .RegisterApplication()
        .RegisterInfrastructure(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigins", builder =>
    {
        builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    });
});

builder.Services.AddControllers()
            .ConfigureApiBehaviorOptions(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var errors = context.ModelState.Values
                        .SelectMany(modelState => modelState.Errors)
                        .Select(error => JsonSerializer.Deserialize<Error>(error.ErrorMessage));
                    return new BadRequestObjectResult(errors);
                };
            });

builder.Services
    .AddGraphQLServer()
    .ModifyCostOptions((options) => { options.MaxFieldCost = 5000; })
    .AddQueryType()
        .AddTypeExtension<TransactionQueries>()
        .AddTypeExtension<TransactionTypeQueries>()
    .AddMutationType()
        .AddTypeExtension<TransactionMutations>()
    .AddProjections()
    .AddFiltering()
    .AddSorting();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var databaseInitializer = scope.ServiceProvider.GetRequiredService<DatabaseInitializer>();
    databaseInitializer.SeedDatabase();

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowOrigins");

app.UseAuthorization();

app.MapGraphQL();

app.MapControllers();

app.Run();
