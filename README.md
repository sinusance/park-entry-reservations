# Puppeteer Date Input Automation

This repository contains a script to automate the process of entering dates on a website using Puppeteer. The script logs into a website, navigates to a date picker, inputs specified dates, takes screenshots, and performs additional actions as needed.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher is recommended)
- [Puppeteer](https://pptr.dev/) (latest version)

## Installation

### 1. Install Node.js

1. **Download Node.js**:
   - Go to the [Node.js download page](https://nodejs.org/) and download the installer for your operating system.
   - Follow the instructions to install Node.js. This will also install `npm` (Node Package Manager).

2. **Verify Installation**:
   - Open your terminal (Command Prompt, PowerShell, or any terminal emulator).
   - Run the following command to verify the installation:
     ```sh
     node -v
     ```
   - You should see the installed version of Node.js. For example: `v16.14.0`.

   - Also, verify `npm` installation by running:
     ```sh
     npm -v
     ```
   - You should see the installed version of `npm`. For example: `8.3.1`.

### 2. Install Puppeteer

1. **Create a Project Directory**:
   - Create a new directory for your project and navigate into it:
     ```sh
     mkdir puppeteer-automation
     cd puppeteer-automation
     ```

2. **Initialize a New Node.js Project**:
   - Run the following command to create a `package.json` file:
     ```sh
     npm init -y
     ```

3. **Install Puppeteer**:
   - Run the following command to install Puppeteer:
     ```sh
     npm install puppeteer
     ```

## Usage

1. **Create the Script File**:
   - Create a new file named `index.js` in your project directory and copy the following script into it:

     ```javascript
     const puppeteer = require('puppeteer');

     function delay(time) {
         return new Promise(function (resolve) {
             setTimeout(resolve, time);
         });
     }

     async function typeKeys(page, keys) {
         for (const key of keys) {
             await page.keyboard.down(key);
             await page.keyboard.up(key);
         }
     }

     async function inputDate(page, dateString) {
         const dateParts = dateString.split('-');
         const month = dateParts[0];
         const day = dateParts[1];
         const year = dateParts[2];

         // Find and click the elements for year, month, and day to make them editable
         const yearSelector = 'div[aria-label="year, "]';
         const monthSelector = 'div[aria-label="month, "]';
         const daySelector = 'div[aria-label="day, "]';

         await page.waitForSelector(yearSelector);
         await page.click(yearSelector);
         await typeKeys(page, year);

         await page.waitForSelector(monthSelector);
         await page.click(monthSelector);
         await typeKeys(page, month);

         await page.waitForSelector(daySelector);
         await page.click(daySelector);
         await typeKeys(page, day);
     }

     async function processDate(dateString) {
         const browser = await puppeteer.launch({ headless: false });
         const page = await browser.newPage();

         // Set default timeout to 60 seconds
         page.setDefaultTimeout(60000);

         try {
             // Navigate to the website
             await page.goto('https://www.recreation.gov/timed-entry/10086910/ticket/10086912');
             // Set screen size
             await page.setViewport({
                 width: 1026,
                 height: 919
             });

             // Perform an interaction (e.g., click a button)
             await page.click('#ga-global-nav-log-in-link');

             // Put login creds in form
             await page.type('#email', 'sinusance@gmail.com');
             await page.type('#rec-acct-sign-in-password', 'fakepassword'); // Replace with the actual password

             const loginButtonSelector = 'button.rec-acct-sign-in-btn'; // Using a class specific to the button

             // Wait for the button to be available and click it
             await page.waitForSelector(loginButtonSelector);
             await page.click(loginButtonSelector);

             // Wait for the login process to complete
             await delay(5000);

             await delay(1000);

             // Wait for the hidden input to be available
             const hiddenInputSelector = 'input[name="datePicker"]';
             await page.waitForSelector(hiddenInputSelector);

             // Input the date
             await inputDate(page, dateString);

             await delay(1000);

             // Take a screenshot of the resulting page
             await page.screenshot({ path: `datescreenshot_${dateString.replace(/-/g, '_')}.png` });

             // Optionally, you can add more actions here for each date, like selecting time and requesting tickets
         } catch (error) {
             console.error(`Error processing date ${dateString}:`, error);
         } finally {
             await browser.close();
         }
     }

     (async () => {
         // List of date strings in 'MM-DD-YYYY' format
         const dateStrings = [
             '07-16-2024',
             '08-15-2024',
             '09-14-2024'
         ];

         // Process each date in parallel
         await Promise.all(dateStrings.map(dateString => processDate(dateString)));
     })();
     ```

2. **Run the Script**:
   - In your terminal, navigate to the project directory and run the script using Node.js:
     ```sh
     node index.js
     ```

3. **Output**:
   - The script will log in to the specified website, input the dates, take screenshots for each date, and save them in the project directory. The screenshots will be named `datescreenshot_MM_DD_YYYY.png`.

## Notes

- Ensure that the login credentials and other specific selectors match the actual values from your target website.
- Adjust the time slot selector and any other interactions as necessary to match the elements on your webpage.

## Troubleshooting

- If you encounter any issues, ensure that all dependencies are installed correctly.
- Check the selectors and make sure they match the elements on the webpage.
- If the script runs too quickly, you might need to increase the delay times.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
