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
        await page.type('#email', 'your@email.com'); // Replace with your email
        await page.type('#rec-acct-sign-in-password', 'passywassy'); // Replace with the actual password

        const loginButtonSelector = 'button.rec-acct-sign-in-btn'; // Using a class specific to the button

        // Wait for the button to be available and click it
        await page.waitForSelector(loginButtonSelector);
        await page.click(loginButtonSelector);

        // Wait for the login process to complete
        await delay(1000);

        // Wait for the hidden input to be available
        const hiddenInputSelector = 'input[name="datePicker"]';
        await page.waitForSelector(hiddenInputSelector);

        // Input the date
        await inputDate(page, dateString);

        await delay(1000);

        // Take a screenshot of the resulting page
        //await page.screenshot({ path: `datescreenshot_${dateString.replace(/-/g, '_')}.png` });

        {
            const targetPage = page;
            await puppeteer.Locator.race([
                targetPage.locator('label:nth-of-type(7) div.te-radio-pill-time'),
                targetPage.locator('::-p-xpath(//*[@id=\\"use-id-109\\"]/div/div/label[7]/span/div/div/div[1])'),
                targetPage.locator(':scope >>> label:nth-of-type(7) div.te-radio-pill-time'),
                targetPage.locator('::-p-text(8:00 AM - 10:00)')
            ])
                .click();
        }
        {
            const targetPage = page;
            await puppeteer.Locator.race([
                targetPage.locator('::-p-aria(Request Tickets)'),
                targetPage.locator('#request-tickets'),
                targetPage.locator('::-p-xpath(//*[@id=\\"request-tickets\\"])'),
                targetPage.locator(':scope >>> #request-tickets')
            ])
                .click({
                  offset: {
                    x: 244,
                    y: 22.0625,
                  },
                });
        }

        await delay(2000);

    } catch (error) {
        console.error(`Error processing date ${dateString}:`, error);
    } finally {
        await browser.close();
    }
}

(async () => {
    // List of date strings in 'MM-DD-YYYY' format
    const dateStrings = [
        '07-20-2024',
        '07-21-2024',
        '07-22-2024',
        '07-23-2024',
        '07-24-2024',
        '07-25-2024',
        '07-26-2024',
        '07-27-2024',        
    ];

    // Process each date in parallel
    await Promise.all(dateStrings.map(dateString => processDate(dateString)));
})();
