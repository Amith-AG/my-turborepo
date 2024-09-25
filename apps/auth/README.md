# Auth.js with Next.js 14, Prisma, and Vercel Postgres

This project demonstrates how to implement authentication using **Auth.js (v5)** with **Credential Provider**, **Prisma**, and **Vercel Postgres** (edge-compatible). The session strategy is customized to handle session creation, encryption, and sign-out events manually.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [Session Handling](#session-handling)
  - [JWT Callback](#jwt-callback)
  - [Session Callback](#session-callback)
  - [JWT Encoding](#jwt-encoding)
- [Edge Compatibility](#edge-compatibility)
- [Useful Links](#useful-links)

## Introduction

In this setup, **manual session management** is implemented using Auth.js. This is particularly important when using the database strategy, especially with edge-compatible databases like **Vercel Postgres**.

The workflow for the credential provider involves manually creating session tokens, saving them in the database with **Prisma**, and handling encryption. The project is designed for **Next.js 14** applications, compatible with edge runtimes.

## Technologies Used

- **Auth.js Version**: v5
- **Provider**: Credential Provider
- **Framework**: Next.js 14
- **Adapter**: Prisma
- **Database**: Vercel Postgres (Edge Compatible)

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Amith-AG/my-turborepo/tree/main/apps/auth
