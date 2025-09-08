10:47:18 PM: Netlify Build                                                 
10:47:18 PM: ────────────────────────────────────────────────────────────────
10:47:18 PM: ​
10:47:18 PM: ❯ Version
10:47:18 PM:   @netlify/build 35.1.4
10:47:18 PM: ​
10:47:18 PM: ❯ Flags
10:47:18 PM:   accountId: 6206e95093451e00ae20c6fb
10:47:18 PM:   baseRelDir: true
10:47:18 PM:   buildId: 68be35927bf02d00082e8af2
10:47:18 PM:   deployId: 68be35927bf02d00082e8af4
10:47:19 PM: ​
10:47:19 PM: ❯ Current directory
10:47:19 PM:   /opt/build/repo
10:47:19 PM: ​
10:47:19 PM: ❯ Config file
10:47:19 PM:   No config file was defined: using default values.
10:47:19 PM: ​
10:47:19 PM: ❯ Context
10:47:19 PM:   production
10:47:19 PM: ​
10:47:19 PM: ❯ Using Next.js Runtime - v5.13.0
10:47:20 PM: No Next.js cache to restore
10:47:20 PM: ​
10:47:20 PM: Build command from Netlify app                                
10:47:20 PM: ────────────────────────────────────────────────────────────────
10:47:20 PM: ​
10:47:20 PM: $ npm run build
10:47:20 PM: > links-compartilhados@0.1.0 build
10:47:20 PM: > next build --turbopack
10:47:21 PM: ⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
10:47:21 PM:    ▲ Next.js 15.5.2 (Turbopack)
10:47:21 PM:    Creating an optimized production build ...
10:47:26 PM:  ✓ Finished writing to disk in 4ms
10:47:26 PM:  ✓ Compiled successfully in 4.4s
10:47:26 PM:    Linting and checking validity of types ...
10:47:29 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
10:47:29 PM: Failed to compile.
10:47:29 PM: 
10:47:29 PM: ./src/app/api/links/[id]/route.ts:126:15
10:47:29 PM: Type error: Argument of type 'any' is not assignable to parameter of type 'never'.
10:47:29 PM:   124 |     const { data: link, error } = await supabase
10:47:29 PM:   125 |       .from('lc_links')
10:47:29 PM: > 126 |       .update(updateFields)
10:47:29 PM:       |               ^
10:47:29 PM:   127 |       .eq('id', id)
10:47:29 PM:   128 |       .eq('user_id', user.id)
10:47:29 PM:   129 |       .select()
10:47:29 PM: Next.js build worker exited with code: 1 and signal: null
10:47:29 PM: ​
10:47:29 PM: "build.command" failed                                        
10:47:29 PM: ────────────────────────────────────────────────────────────────
10:47:29 PM: ​
10:47:29 PM:   Error message
10:47:29 PM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
10:47:29 PM: ​
10:47:29 PM:   Error location
10:47:29 PM:   In Build command from Netlify app:
10:47:29 PM:   npm run build
10:47:29 PM: ​
10:47:29 PM:   Resolved config
10:47:29 PM:   build:
10:47:29 PM:     command: npm run build
10:47:29 PM:     commandOrigin: ui
10:47:29 PM:     environment:
10:47:29 PM:       - NEXT_PUBLIC_SUPABASE_ANON_KEY
10:47:29 PM:       - NEXT_PUBLIC_SUPABASE_URL
10:47:29 PM:       - SUPABASE_SERVICE_ROLE_KEY
10:47:29 PM:     publish: /opt/build/repo/.next
10:47:29 PM:     publishOrigin: ui
10:47:29 PM:   plugins:
10:47:29 PM:     - inputs: {}
10:47:29 PM:       origin: ui
10:47:29 PM:       package: "@netlify/plugin-nextjs"
10:47:29 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
10:47:29 PM: Failing build: Failed to build site
10:47:30 PM: Finished processing build request in 30.366s