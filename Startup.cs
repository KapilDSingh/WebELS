using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SignalR;
using WebELS.EF;
using WebELS.Hubs;
using WebELS.Repository;
using WebELS.SqlTableDependencies;
using WebELS;
using WebELS.Models;

namespace WebELS
{
    public class Startup
    {
        private const string ConnectionString = @"Data Source=tcp: kapilsingh.synology.me\SQLEXPRESS,1433;Initial Catalog=ISODB;Integrated Security = False;User ID=Kapil;Password=Acfjo12#;";
        //private const string ConnectionString = @"Data Source=tcp:100.25.120.167\EC2AMAZ-I2S81GT,1433;Initial Catalog=ISODB;Integrated Security = False;User ID=KapilSingh;Password=Acfjo12#;";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddCors(o => o.AddPolicy("All", b => b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials()));
            services.AddSignalR();

            // dependency injection
            services.AddDbContextFactory<ISODBContext>(ConnectionString);
            services.AddSingleton<ILMPRepository, LMPRepository>();
            services.AddSingleton<IISODBSubscription, ISODBSubscription>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseCors("All");
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
            app.UseSignalR(routes =>
            {
                routes.MapHub<ISODataHub>("/ISOData");
            });

            app.UseSqlTableDependency<IISODBSubscription>(ConnectionString);


            app.UseSpa(spa =>
            {
                    // To learn more about options for serving an Angular SPA from ASP.NET Core,
                    // see https://go.microsoft.com/fwlink/?linkid=864501

                    spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    //spa.UseAngularCliServer(npmScript: "start");

                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
