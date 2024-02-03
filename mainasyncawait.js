const puppeteer=require("puppeteer");
const answerObj=require("./answer")
const hackerrankLink="https://www.hackerrank.com/auth/login";
const username="sahilsinha0808@gmail.com";
const password="imrohit@45";

(async function (){
    try {
        const browser= await puppeteer.launch({headless:false,slowMo:true,defaultViewport:null,args:["--start-maximized"]});
    
        let page=await browser.newPage();
    
        await page.goto(hackerrankLink);
    
        await page.type("input[type='text']",username);
    
        await page.type("input[type='password']",password); 
    
        await page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled",{delay:50});
    
        await page.waitForSelector("a[href='/domains/algorithms']",{visible:true});
    
        await page.click("a[href='/domains/algorithms']",{delay:50});
    
        await page.waitForSelector("input[value='warmup']",{visible:true});
        await page.click("input[value='warmup']",{delay:500});
    
        await page.waitForTimeout(4000);
        let allQuestion = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-styled");
        console.log("number of questions is:",allQuestion.length);
    
        await solver(allQuestion[1],page,answerObj.answerKey[1]);
        await page.waitForTimeout(3000);
        await page.goBack();
        await page.waitForSelector("input[value='warmup']",{visible:true});
        allQuestion = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-styled");
        await solver(allQuestion[2],page,answerObj.answerKey[0]);
        await page.goBack();
        await page.waitForSelector("input[value='warmup']",{visible:true});
        allQuestion = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-styled");
        await solver(allQuestion[3],page,answerObj.answerKey[2]);
        await page.goBack();
        await page.waitForSelector("input[value='warmup']",{visible:true});
        allQuestion = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-styled");
        await solver(allQuestion[4],page,answerObj.answerKey[3]);
        await page.goBack();
        await page.waitForSelector("input[value='warmup']",{visible:true});
        allQuestion = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-styled");
        await solver(allQuestion[5],page,answerObj.answerKey[4]);
        
    } catch (error) {
        console.log(error);
    }

})()

async function solver(question,page,answer){
    await question.click({delay:100});
    await page.waitForSelector(".hr-monaco-editor-parent",{visible:true});
    await page.waitForSelector(".checkbox-input",{visible:true});
    await page.click(".checkbox-input",{delay:100});
    await page.type(".input.text-area.custominput.auto-width",answer);
    await page.keyboard.down("Control");
    await page.keyboard.press("A");
    await page.keyboard.press("X");
    await page.keyboard.up("Control");

    await page.click(".hr-monaco-editor-parent",{delay:50});
    await page.keyboard.down("Control");
    await page.keyboard.press("A");
    await page.keyboard.press("V");
    await page.keyboard.up("Control");
    await page.click(".hr-monaco-submit",{delay:50});
    const waitForSubmissionResult=await page.waitForSelector(".submission-message",{visible:true});
    return waitForSubmissionResult;
}
