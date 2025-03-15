import { loginUser, saveUserData } from "../api/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfilePhoto, getUserName } from "../api/profile";


function Profile()
{
    return (
        <main className="flex-grow flex items-center justify-center">
        <div className="bg-white/70 shadow-lg rounded-lg p-8 m-[0.5rem] max-w-6xl w-full">
        <div className="flex flex-row bg-white shadow-lg rounded-lg p-5 my-[0.2rem]  w-full">
            <img src="/noimg.jpg" alt="ImgProfil" className="max-w-[12rem]"></img>
          <div className="text-3xl font-semibold mx-[5rem] my-[3rem]">{getUserName()}</div>
        </div>
          <p>
            Ця секція займає весь простір між хедером і футером. 
            Текст всередині вирівняний, а фон білий з тінню, щоб виділити його наApplication started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
      soft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."P
      soft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Psoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1soft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Psoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Psoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Psoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Psoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Psoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Psoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Psoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Psoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Psoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Psoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."P
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."P
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/oleh/RiderProjects/TestArena/TestArena
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__email_1='?'], CommandType='Text', CommandTimeout='30']
      SELECT u."Id", u."Email", u."Password", u."Phone", u."Photo", u."UserName"
      FROM "Users" AS u
      WHERE u."Email" LIKE @__email_1 ESCAPE ''
      LIMIT 1
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
 сторінці.
          </p>
        </div>
      </main>
    );
}

export default Profile;