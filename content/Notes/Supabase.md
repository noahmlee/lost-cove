---
title: Supabase
draft: 
tags:
  - notes
  - tools/services
  - backend
  - database
  - postgresql
---
## Supabase

Supabase is basically the open-source Firebase — but it’s built on **PostgreSQL**. You get a hosted DB, real-time listeners, auth, storage, and REST/GraphQL APIs — all out of the box.

Perfect for projects where you want a full backend fast but still want full control.

---

### What You Get

- **Postgres DB**: Powerful, relational, and ready to query.
    
- **Auth**: Email/password, magic links, OAuth (Google, GitHub, etc.).
    
- **Storage**: For files, images, etc. Upload + manage via API or dashboard.
    
- **Edge Functions**: Serverless functions written in JavaScript/TypeScript.
    
- **APIs**: Auto-generated REST API for every table. Plus support for GraphQL.
    

---

### Setup Flow

1. Go to [supabase.com](https://supabase.com) → make a new project.
    
2. Pick a name, password, and region.
    
3. You get a Postgres DB and a dashboard.
    
4. Grab your **anon/public** key and **project URL** from the settings — you’ll need these for frontend.
    

---

### Example: Connecting in a Frontend App
```
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	'https://your-project.supabase.co',
	'public-anon-key'
);
```

---

### Notes to Self

- Auth is **session-based**, stored in localStorage by default.
    
- Tables = instant REST API.  
    You can do `.select()`, `.insert()`, `.update()`, etc.
    
- Row-level security (RLS) is on by default — set up **policies** or nothing will work.
    
- Use **Supabase Studio** to manage your data, auth, and storage visually.
    
- Works great with **Next.js**, especially in API routes or middleware.
    

---

### Auth Example
```
// Sign up
await supabase.auth.signUp({
	email: 'email@example.com',
	password: 'yourpassword' 
});

// Sign in
await supabase.auth.signInWithPassword({
	email: 'email@example.com',
	password: 'yourpassword' 
});
```

---

### Storage Example
```
const { data, error } = await supabase.storage
	.from('images')
	.upload('folder/file.png', file);
```
You can make public buckets or use signed URLs.

---

### Why I Use It

> Supabase gives me the backend I want **without boilerplate**. The DB is real (Postgres), the APIs are instant, and auth just works. Feels like cheating — in a good way.