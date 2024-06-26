/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedProfileImport } from './routes/_authenticated/profile'
import { Route as AuthenticatedAllJobsImport } from './routes/_authenticated/AllJobs'
import { Route as AuthenticatedAddNewJobImport } from './routes/_authenticated/AddNewJob'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedAllJobsRoute = AuthenticatedAllJobsImport.update({
  path: '/AllJobs',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedAddNewJobRoute = AuthenticatedAddNewJobImport.update({
  path: '/AddNewJob',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/AddNewJob': {
      preLoaderRoute: typeof AuthenticatedAddNewJobImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/AllJobs': {
      preLoaderRoute: typeof AuthenticatedAllJobsImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/profile': {
      preLoaderRoute: typeof AuthenticatedProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticatedRoute.addChildren([
    AuthenticatedAddNewJobRoute,
    AuthenticatedAllJobsRoute,
    AuthenticatedProfileRoute,
    AuthenticatedIndexRoute,
  ]),
  AboutRoute,
])

/* prettier-ignore-end */
