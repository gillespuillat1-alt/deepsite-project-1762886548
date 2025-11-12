const IA_LIST = [
  { id:'gpt-4o', name:'GPT-4o', icon:'assets/img/ia-gpt.svg' },
  { id:'claude-3-5', name:'Claude 3.5', icon:'assets/img/ia-claude.svg' },
  { id:'deepseek-v3', name:'DeepSeek V3', icon:'assets/img/ia-deepseek.svg' },
  { id:'gemini-1-5', name:'Gemini 1.5', icon:'assets/img/ia-gemini.svg' },
  { id:'mistral-large', name:'Mistral Large', icon:'assets/img/ia-mistral.svg' },
  { id:'llama-405b', name:'Llama 405B', icon:'assets/img/ia-llama.svg' },
  { id:'qwen-72b', name:'Qwen 72B', icon:'assets/img/ia-qwen.svg' },
  { id:'perplexity-sonar', name:'Perplexity Sonar', icon:'assets/img/ia-perplexity.svg' }
];
const MAX_PARALLEL = 4; const sel = new Set();
let favorite = localStorage.getItem('ia_fav') || 'gpt-4o';
const $=(q,r=document)=>r.querySelector(q), $$=(q,r=document)=>[...r.querySelectorAll(q)];
const toast = (m)=>{ const t=$('#toast'); t.textContent=m; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2000); };
function renderIA(){ const grid=$('#iaGrid'); grid.innerHTML='';
  IA_LIST.forEach(m=>{ const el=document.createElement('button'); el.className='ia'+(m.id===favorite?' favorite':''); el.type='button'; el.dataset.id=m.id;
    el.innerHTML=`<img src="${m.icon}" alt=""><span class="name">${m.name}</span><span class="meta"></span>`;
    el.onclick=()=>toggleIA(m.id,el); el.ondblclick=()=>setFavorite(m.id); grid.appendChild(el); });
  const favEl=grid.querySelector(`.ia[data-id="${favorite}"]`); if(favEl) selectEl(favorite,favEl,true);
}
function setFavorite(id){ favorite=id; localStorage.setItem('ia_fav',id); $$('.ia').forEach(el=>el.classList.toggle('favorite', el.dataset.id===id)); toast(`IA préférée : ${id}`); }
function toggleIA(id,el){ if(sel.has(id)){ sel.delete(id); el.classList.remove('active'); } else {
    if(sel.size>=MAX_PARALLEL){ toast(`Cap ${MAX_PARALLEL} (sécurité) — désélectionne une IA pour en ajouter.`); return; }
    selectEl(id,el);
  } updateMeta();
}
function selectEl(id,el,silent=false){ sel.add(id); el.classList.add('active'); if(!silent) updateMeta(); }
function updateMeta(){ $$('.ia').forEach(el=>{ const id=el.dataset.id; const idx=[...sel].indexOf(id); $('.meta',el).textContent= sel.has(id)?`#${idx+1}`:''; }); }
$('#btnMemory').onclick=()=>{ const d=$('#memoryDrawer'); const hidden=d.hasAttribute('hidden'); d.toggleAttribute('hidden',!hidden); $('#btnMemory').setAttribute('aria-expanded', String(hidden)); };
$('#btnCloseMem').onclick=()=>$('#memoryDrawer').setAttribute('hidden','');
$('#btnMic').onclick=(e)=>{ const on=e.currentTarget.getAttribute('aria-pressed')!=='true'; e.currentTarget.setAttribute('aria-pressed', String(on)); toast(on?'Dictée (STT) activée':'Dictée (STT) désactivée'); };
$('#btnTTS').onclick=(e)=>{ const on=e.currentTarget.getAttribute('aria-pressed')!=='true'; e.currentTarget.setAttribute('aria-pressed', String(on)); toast(on?'Lecture (TTS) activée':'Lecture (TTS) désactivée'); };
function seedSynthesis(){ $('#s-accords').innerHTML=`<ul><li>Définition identique sur 3 IA.</li><li>Format court respecté.</li></ul>`;
  $('#s-complements').innerHTML=`<ul><li>Une IA ajoute un exemple.</li><li>Une autre propose une vérification.</li></ul>`;
  $('#s-divergences').innerHTML=`<ul><li>Différence d’ordre des étapes.</li></ul>`;
  $('#s-plan').innerHTML=`<li>Poser la question → 1–4 réponses courtes.</li><li>Lire A/C/D.</li><li>Exécuter Plan(3) ou passer en Compose.</li>`;
}
renderIA(); seedSynthesis();
