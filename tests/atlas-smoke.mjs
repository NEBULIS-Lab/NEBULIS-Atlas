// One focused smoke pass for the static atlas; no external resource reproduction.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const origin=process.env.TEST_URL||'http://127.0.0.1:4387';
const base=process.env.TEST_BASE||'';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-gpu']});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage();const errors=[],external=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
page.on('request',r=>{if(r.url().startsWith('http')&&new URL(r.url()).origin!==new URL(origin).origin)external.push(r.url());});
await fs.mkdir('test-results',{recursive:true});let checks=0;
async function go(hash=''){await page.goto(origin+base+'/'+hash);await page.waitForSelector('html[data-atlas-ready="true"]');}
try{
 await go();assert.equal(await page.locator('.island-pin').count(),7);assert.match(await page.locator('h1').innerText(),/Embodied AI Adventure/);checks++;
 await page.locator('.skip-link').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.island-pin').count(),7);checks++;
 await page.locator('.island-pin[href="#/island/robot"]').click();await page.waitForSelector('.path-node');assert.equal(await page.locator('.path-node').count(),5);checks++;
 await go('#/resource/R02');await page.waitForSelector('video');await page.locator('video').evaluate(v=>v.play());await page.waitForFunction(()=>document.querySelector('video').currentTime>0);await page.locator('video').evaluate(v=>v.pause());checks++;
 await page.locator('[data-read]').click();await page.locator('.save-detail').click();await page.reload();await page.waitForSelector('[data-read][aria-pressed="true"]');assert.equal(await page.locator('.save-detail').getAttribute('aria-pressed'),'true');checks++;
 await page.locator('[data-term]').first().click();assert.equal(await page.locator('#term-dialog').evaluate(d=>d.open),true);await page.keyboard.press('Escape');checks++;
 await go('#/library?q=OpenVLA');await page.waitForSelector('#library-grid .resource-card');assert.equal(await page.locator('#library-grid .resource-card').count(),1);await page.locator('#library-search').fill('no-such-resource-123456');await page.waitForSelector('.empty-state');await page.getByRole('button',{name:'重新探索'}).click();checks++;
 await go('#/library?scope=harbor&island=embodied&type=dataset');await page.waitForSelector('#library-grid .resource-card');assert.ok(await page.locator('#library-grid').innerText().then(t=>t.includes('DROID')));checks++;
 await go('#/resource/DS05');await page.locator('.back-island').click();await page.waitForSelector('#library-grid .resource-card');assert.ok(await page.locator('#library-grid .resource-card').count()>20);checks++;
 await page.getByRole('button',{name:'搜索资料',exact:true}).click();await page.locator('#global-search').fill('V-JEPA');await page.waitForSelector('.search-result');assert.ok(await page.locator('.search-result').count()>=2);await page.keyboard.press('Escape');checks++;
 await go('#/journey/vla');await page.waitForSelector('.journey-path');assert.ok(await page.locator('.path-node').count()>=5);checks++;
 await go('#/frontier');await page.waitForSelector('.frontier-grid');assert.equal(await page.locator('.frontier-grid .resource-card').count(),5);checks++;
 await go();await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:'test-results/research-home-desktop.png'});await page.locator('#world-map').screenshot({path:'test-results/research-map-desktop.png'});
 await page.setViewportSize({width:390,height:844});await go();await page.getByRole('button',{name:'打开导航'}).click();assert.equal(await page.locator('.mobile-nav').isVisible(),true);await page.getByRole('button',{name:'打开导航'}).click();assert.equal(await page.locator('.mobile-island-links a').count(),7);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:'test-results/research-home-mobile.png'});checks++;
 await go('#/library');await page.waitForSelector('#library-grid .resource-card');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:'test-results/research-library-mobile.png'});checks++;
 assert.deepEqual([...new Set(errors)],[]);assert.deepEqual([...new Set(external)],[]);
 console.log(JSON.stringify({passed:true,checks,base,browserErrors:errors.length,externalRequests:external.length},null,2));
} finally {await fs.writeFile('test-results/research-diagnostics.json',JSON.stringify({checks,errors,external},null,2));await browser.close();}
