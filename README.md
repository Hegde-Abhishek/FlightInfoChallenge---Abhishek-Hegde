# FlightInfoChallenge---Abhishek-Hegde
A simple Angular web app deployed to Firebase.

**Live app:** https://flight-app--abhishek-hegde.web.app  
**Repo:** https://github.com/Hegde-Abhishek/FlightInfoChallenge-Abhishek-Hegde 

**Reviewer credentials**  
- Email: reviewer@monster.com  
- Password: Abhishek 

(You can also sign in with Google.)

---

## What this delivers
- **Auth-gated**: Email/Password + Google (Firebase Auth). Guarded routes; direct access to `/flight` redirects to `/login`; denies access unless authorized.
- **Form**: Airline, flight number, guests, date, time (12h UI -> 24h value), optional comments. Validation + first-invalid focus.
- **POST**: POST to Cloud Function with required headers:
  - `token` (provided token)
  - `candidate: Abhishek Hegde`
- **UX**: Clear success screen (receipt summary), failure messages, copy JSON helper, keyboard-friendly, responsive layout, tasteful animations,
- **Hosting**: Firebase Hosting (url above)


---

## Run locally
```bash
npm i
npm start
# http://localhost:4200



