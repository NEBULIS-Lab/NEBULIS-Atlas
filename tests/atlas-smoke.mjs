// One focused browser pass for the landing → world → resource journey.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const origin=process.env.TEST_URL||'http://127.0.0.1:4387',base=process.env.TEST_BASE||'';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-gpu']});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage(),errors=[],external=[];let checks=0;
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
page.on('request',r=>{if(r.url().startsWith('http')&&new URL(r.url()).origin!==new URL(origin).origin)external.push(r.url());});
await fs.mkdir('test-results',{recursive:true});
async function go(hash=''){await page.goto(origin+base+'/'+hash);await page.waitForSelector('html[data-atlas-ready="true"]');}
async function shot(name){await page.waitForTimeout(600);await page.screenshot({path:`test-results/${name}.png`});}
try{
 await go();const landing=page.frameLocator('.template-landing');await landing.locator('.research-title').waitFor();assert.match(await landing.locator('.research-title').innerText(),/Embodied AI/);await shot('restored-home');checks++;
 await landing.locator('[data-explore]').first().click();await page.waitForSelector('[data-scene-ready="true"]');assert.equal(await page.locator('.island-terrain').count(),7);assert.ok(await page.locator('.world-sprite').count()>200);assert.equal(await page.locator('.island-panel').isVisible(),false);await shot('composed-world');checks++;
 // Keyboard panning and wheel zoom change the composed world camera.
 const stage=page.locator('.sea-world'),before=await stage.getAttribute('style');await page.locator('.sea-viewport').focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(250);assert.notEqual(await stage.getAttribute('style'),before);const z=await page.locator('.zoom-level').textContent();await page.locator('[data-world="zoom-in"]').click();await page.waitForTimeout(250);assert.notEqual(await page.locator('.zoom-level').textContent(),z);await page.locator('[data-world="overview"]').click();checks++;
 await page.locator('.world-destinations a[href="#/island/robot"]').click();await page.locator('.island-panel h2').waitFor();assert.equal(await page.locator('.panel-node-list li').count(),5);await shot('composed-robot');checks++;
 await page.locator('.world-region.selected .island-learning-node[href$="/R02"]').click();await page.locator('.island-panel video').waitFor();await page.locator('.island-panel video').evaluate(v=>v.play());await page.waitForFunction(()=>document.querySelector('.island-panel video').currentTime>0);await page.locator('video').evaluate(v=>v.pause());await page.locator('[data-world-read="R02"]').click();await page.reload();await page.waitForSelector('.panel-read.is-read');await page.locator('[data-world-term]').first().click();assert.equal(await page.locator('#term-dialog').evaluate(d=>d.open),true);await page.keyboard.press('Escape');checks++;
 await page.locator('.panel-full-link').click();await page.locator('.resource-page').waitFor();await page.locator('.save-detail').click();await page.reload();await page.waitForSelector('.save-detail[aria-pressed="true"]');checks++;
 await go('#/library?q=OpenVLA');await page.locator('#library-grid .resource-card').waitFor();assert.equal(await page.locator('#library-grid .resource-card').count(),1);checks++;
 await go('#/island/harbor');await page.locator('.panel-node-list').waitFor();assert.ok(await page.locator('.panel-node-list li').count()>20);await page.locator('[data-world="search"]').click();await page.locator('#global-search').fill('V-JEPA');await page.locator('.search-result').first().waitFor();assert.ok(await page.locator('.search-result').count()>=2);await page.keyboard.press('Escape');checks++;
 await page.setViewportSize({width:390,height:844});await go();await page.frameLocator('.template-landing').locator('.research-title').waitFor();await shot('restored-home-mobile');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));checks++;
 await page.frameLocator('.template-landing').locator('[data-explore]').first().click();await page.waitForSelector('[data-scene-ready="true"]');await shot('composed-world-mobile');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.locator('.world-destinations a[href="#/island/embodied"]').click();await page.locator('.panel-node-list').waitFor();assert.equal(await page.locator('.panel-node-list li').count(),8);await shot('composed-island-mobile');await page.locator('.panel-close').click();await page.waitForFunction(()=>document.querySelector('.island-panel').hidden);checks++;
 assert.deepEqual([...new Set(errors)],[]);assert.deepEqual([...new Set(external)],[]);
 console.log(JSON.stringify({passed:true,checks,base,browserErrors:errors.length,externalRequests:external.length},null,2));
}finally{await fs.writeFile('test-results/research-diagnostics.json',JSON.stringify({checks,errors,external},null,2));await browser.close();}
