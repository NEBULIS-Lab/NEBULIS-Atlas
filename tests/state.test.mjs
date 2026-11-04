import test from 'node:test';
import assert from 'node:assert/strict';
import {completeLesson,loadState,saveBuild,courseProgress} from '../src/state.mjs';
test('invalid persisted state recovers to an empty profile',()=>{assert.deepEqual(loadState('{broken').completed,[]);assert.deepEqual(loadState('{"completed":null}').completed,[]);});
test('lesson completion awards XP once, survives serialization and is scoped by course',()=>{let state=loadState();state=completeLesson(state,'/python/01-setting-up');state=completeLesson(state,'/python/01-setting-up');state=completeLesson(state,'/html/01-shooting-star');assert.equal(state.xp,30);assert.equal(courseProgress(loadState(JSON.stringify(state)),'python'),1);});
test('build updates preserve unrelated builds and code exactly',()=>{let state=saveBuild(loadState(),{id:'a',title:'A',code:'<h1>Hello</h1>',language:'html'});state=saveBuild(state,{id:'b',title:'B',code:'print("b")',language:'python'});state=saveBuild(state,{id:'a',title:'Updated',code:'<script>1<2</script>',language:'html'});assert.equal(state.builds.length,2);assert.equal(state.builds[0].code,'<script>1<2</script>');});
