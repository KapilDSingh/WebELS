using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using WebELS.SqlTableDependencies;

namespace WebELS
{
    public static class UseSqlTableDependencyHelpers
    {
        public static void UseSqlTableDependency<T>(this IApplicationBuilder services, string connectionString) where T : IISODBSubscription
        {
            var serviceProvider = services.ApplicationServices;
            var subscription = serviceProvider.GetService<T>();
            subscription.Configure(connectionString);
        }
    }
}
