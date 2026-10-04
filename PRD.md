# COMPREHENSIVE PROMPT FOR "ANGEL TEAM" FIGURE SKATING SCHOOL WEBSITE DEVELOPMENT
 
## PROJECT OVERVIEW
 
### Basic Information:
- **Name:** Angel Team - Figure Skating and Hockey School
- **Target Audience:** Children (3-17 years) and adults (18+), beginners to professional athletes
- **Locations:** Nizhny Novgorod, Moscow, Bogorodsk, Dzerzhinsk
- **Style:** Modern, sporty, minimalist with accent elements
 
### Technical Requirements:
- Responsive design (mobile-first approach)
- Cross-browser compatibility
- Performance optimization
- SEO optimization
- WCAG 2.1 compliance
 
## DESIGN AND VISUAL IDENTITY
 
### Color Palette (just as reference):
```css
--primary-black: #000000;          /* Main text */
--primary-white: #FFFFFF;          /* Background */
--accent-red: #FF3366;             /* Accent elements, buttons */
--dark-gray: #2D2D2D;              /* Footer, dark blocks */
--light-gray: #F8F8F8;             /* Background blocks */
--medium-gray: #E5E5E5;            /* Borders, dividers */
--text-gray: #666666;              /* Secondary text */
```
 
### Typography:
- **Headings:** "Montserrat" - Bold/ExtraBold
- **Body Text:** "Roboto" - Light/Regular
- **Navigation & Buttons:** "Open Sans" - Medium
 
### Font Hierarchy:
```css
h1: 72-84px (ExtraBold)           /* Main heading */
h2: 36-42px (Bold)                /* Section headings */
h3: 24-28px (Medium)              /* Subheadings */
h4: 20-24px (Medium)              /* Card headings */
body: 16-18px (Regular)           /* Body text */
small: 14px (Light)               /* Secondary text */
```
 
## WEBSITE STRUCTURE AND NAVIGATION
 
### Main Pages:
```
1. index.html          - Homepage
2. coaches.html        - Coaching Staff
3. schedule.html       - Schedule
4. prices.html         - Pricing
5. shop.html           - Shop
6. reviews.html        - Reviews
7. contacts.html       - Contacts
8. booking.html        - Booking System
9. coach-[name].html   - Individual Coach Pages (8 pages)
```
 
### Navigation Menu (Header):
```
[ANGEL TEAM Logo] | ABOUT | SCHEDULE | COACHES | REVIEWS | HOCKEY | CONTACTS | [BOOKING BUTTON]
```
 
**Menu Functionality:**
- **Logo** → Homepage
- **"About"** → Anchor link to about section on homepage
- **"Schedule"** → Schedule page
- **"Coaches"** → Coaching Staff page
- **"Reviews"** → Reviews page
- **"Hockey"** → Hockey programs section
- **"Contacts"** → Contacts page
- **"BOOKING" button** → Booking page
 
## DETAILED PAGE DESCRIPTIONS
 
### 1. HOMEPAGE (index.html)
 
**Structure:**
```
[HEADER]
├── Hero Section:
│   ├── "SANGEL TEAM" (main heading)
│   ├── "From First Steps to Olympic Dreams" (subheading)
│   ├── School description (2-3 paragraphs)
│   └── "BOOK A TRAINING" button
├── Achievements Block:
│   ├── Card "21" - "Champions and winners of All-Russian competitions"
│   └── Card "3" - "Candidate Masters of Sports"
├── "Our Advantages" Block:
│   ├── COACHES: Professional athletes, CMS
│   ├── 9 LOCATIONS: Nizhny Novgorod, Moscow, Bogorodsk, Dzerzhinsk
│   ├── PROFESSIONAL TRAINING: Preparation for SOR, choreography, SFP, stretching
│   ├── COMPETITIONS: Participation from 2nd month of training
│   └── WORK WITH PROS: Program setup, jumps, rotations
├── Schedule Preview
└── [FOOTER]
```
 
### 2. COACHING STAFF (coaches.html)
 
**Coaches List (8 people):**
1. Nikolaeva Alisa
2. Esina Ekaterina
3. Pavlova Anastasia
4. Kostycheva Polina
5. Kuznetsov Vladimir
6. Pashintseva Daria
7. Meshcheryakova Nadezhda
8. Nikitina Irina
 
**Coach Card Structure:**
- Coach photo
- Last Name and First Name
- Position (coach/head coach)
- Brief specialization
- "Learn More" button → redirects to coach's page
 
### 3. INDIVIDUAL COACH PAGES (coach-[name].html)
 
**Template:**
```
[HEADER]
├── Coach photo
├── Last Name and First Name
├── Position
├── Specialization
├── Biography and achievements (bulleted list)
├── Schedule Block:
│   ├── Interactive weekly table
│   ├── Color coding: 🟢 available, 🔴 booked, 🟡 pending
│   └── Working locations
└── "BOOK WITH COACH" button
[FOOTER]
```
 
**Content for Each Coach (based on provided data):**
 
**Nikolaeva Alisa:**
- Biography: started skating at 1.5 years, SOR from 4 years, competitions from 6 years, Nizhny Novgorod region team
- Schedule: Mon-Sun 10:00-22:00 (detailed schedule from file)
 
**Esina Ekaterina:**
- Biography: on ice from 4.5 years, All-Russian competitions, Nizhny Novgorod region team, jumping technique experience
- Schedule: Mon-Sun 10:00-22:00 (detailed schedule from file)
 
**Kostycheva Polina:**
- Biography: skates from 3 years, 11 years single skating, "Arabesque" team, Nizhny Novgorod region team
- Schedule: Mon,Thu 13:45-20:45; Wed 10:15-12:45
 
### 4. BOOKING PAGE (booking.html)
 
the user must have possibility to select:
```
SELECT1 1: COACH
[ ] Specific Coach    [ ] Any Available Coach
 
SELECT2 2: COACH SELECTION (if specific coach chosen)
• Dropdown with coach photos
• Shows coach's schedule when selected
 
SELECT 3: LOCATION SELECTION
• Dynamic list (depends on coach selection)
• For specific coach - only their locations
• For any coach - all locations
 
SELECT 4: DATE AND TIME SELECTION
• Simple calendar with default current date
• Time slot are 1 hour increaments (minimal slot/change)
 
SELECT 5: CLIENT OWN INFORMATION
• Name (required)*
• Phone (required)*
• Email (optional)
• Athlete's age
• Skill level*

* - MANDATORY FIELDS
 
SELECT 6: ADDITIONAL OPTIONS
[ ] Agree to 2-student training

```
the form should originate email with the above parameters to email address: vb@peerf.me
the mail sender for form to be used is "emailjs" (import emailjs from '@emailjs/browser')
 

### 6. SCHEDULE (schedule.html)

timetable is also taken from github repository which acts as CMS (content management system)

Examples:
 
**Structure by Venues:**
 
**TRK "RAY":**
- Children: Mon 11:15-12:15, 19:45-20:45; Sat 11:15-12:15, 13:45-14:45
- Adults: Mon 14:30-15:30
- Special Training: Sat 12:30-13:30
 
**TRK "OKEANIS":**
- Children: Tue 18:00-19:00; Thu 18:00-19:00; Sat 11:30-12:30, 13:00-14:00
- Adults: Sat 12:00-13:00
- Special Training: Thu 16:45-17:45, 17:45-18:45
 
**ul. NARTOVA:**
- Children: Sat 13:00-14:00
- Special Training: Mon 14:00-15:00 (physical), Sat 12:30-13:30 (choreography)
 
### 7. PRICING (prices.html)
 
**Price Tiers:**
- **Individual:** single 1500₽, package 600₽
- **Group:** single 2500₽, package 1550₽
- **"First Steps" (1x/week):** 7950₽ (base), from 4500₽ by venue
- **"Debut" (2x/week):** 15450₽ (base), from 8450₽ by venue
- **Additional:** SFP/choreography from 3200₽
 
### 8. SHOP (shop.html)
 
**Products:**
- Velvet costume - 4900₽
- Name&Logo T-shirt - 2700₽
- Name&Logo Longsleeve - 2700₽
- Name&Logo Vest - 6000₽
 
 
## RESPONSIVE DESIGN
 
### Breakpoints:
- **Mobile:** 320px - 768px (vertical stack)
- **Tablet:** 768px - 1024px (2 columns)
- **Desktop:** 1024px+ (full layout)
 
### Mobile ready - Mobile Version Specifics:
- Hamburger menu
- Vertical schedule tables
- Simplified forms
- Large interactive elements
 
 

# Draft of design in Figma
 link to Figma design:
https://www.figma.com/proto/vz8uOEVNtXQd57zQxqYIk3/Figma-basics?node-id=853-2&p=f&t=lT9QzgqIxTkS2ksV-0&scaling=min-zoom&content-scaling=fixed&page-id=604%3A2&starting-point-node-id=705%3A8

https://www.figma.com/proto/vz8uOEVNtXQd57zQxqYIk3/Figma-basics?node-id=705-8&p=f&t=lT9QzgqIxTkS2ksV-0&scaling=min-zoom&content-scaling=fixed&page-id=604%3A2&starting-point-node-id=705%3A8
