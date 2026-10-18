const measurementId='G-GLZ0H84MBV';
const storageKey='ym-analytics-consent-v1';
const readChoice=()=>{try{return localStorage.getItem(storageKey)}catch{return null}};
const saveChoice=value=>{try{localStorage.setItem(storageKey,value)}catch{}};
const panel=document.createElement('section');
panel.className='analytics-consent';
panel.setAttribute('role','dialog');
panel.setAttribute('aria-labelledby','analytics-consent-title');
panel.setAttribute('aria-describedby','analytics-consent-description');
panel.innerHTML='<h2 id="analytics-consent-title">YOUR PRIVACY CHOICE</h2><p id="analytics-consent-description">Google Analytics helps us understand how people use this website. Analytics is off unless you choose to allow it.</p><div class="analytics-consent-actions"><button type="button" data-consent="accept">Accept analytics</button><button type="button" data-consent="reject">Reject</button></div>';
const settings=document.createElement('button');
settings.className='analytics-settings';
settings.type='button';
settings.textContent='Privacy settings';
settings.setAttribute('aria-label','Change analytics privacy settings');
document.body.append(panel,settings);
function enableAnalytics(){
  if(window.ymAnalyticsLoaded)return;
  window.ymAnalyticsLoaded=true;
  window.dataLayer=window.dataLayer||[];
  function gtag(){window.dataLayer.push(arguments)}
  window.gtag=gtag;
  gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  gtag('js',new Date());
  gtag('config',measurementId,{send_page_view:false});
  gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  gtag('event','page_view',{page_location:location.href,page_title:document.title,page_path:location.pathname});
  const script=document.createElement('script');
  script.async=true;
  script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(measurementId);
  document.head.append(script);
}
function choose(value){
  saveChoice(value);
  panel.hidden=true;
  settings.hidden=false;
  if(value==='accepted')enableAnalytics();
}
panel.addEventListener('click',event=>{
  const choice=event.target.closest('[data-consent]')?.dataset.consent;
  if(choice)choose(choice==='accept'?'accepted':'rejected');
});
settings.addEventListener('click',()=>{
  panel.hidden=false;
  settings.hidden=true;
  panel.querySelector('[data-consent="accept"]').focus();
});
const saved=readChoice();
if(saved==='accepted'){panel.hidden=true;settings.hidden=false;enableAnalytics()}
else if(saved==='rejected'){panel.hidden=true;settings.hidden=false}
else{panel.hidden=false;settings.hidden=true}
