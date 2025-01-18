using DepositaCashOperations.Application.Common.Interfaces;
using DepositaCashOperations.Infrastructure.DataSeeding;
using DepositaCashOperations.Infrastructure.Persistence;
using DepositaCashOperations.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DepositaCashOperations.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection RegisterInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("BankingDatabase");

            services.AddDbContext<BankingDbContext>(options => options.UseSqlServer(connectionString));
            services.AddTransient<DatabaseInitializer>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            return services;
        }
    }
}
