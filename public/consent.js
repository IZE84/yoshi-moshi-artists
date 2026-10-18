const measurementId='G-GLZ0H84MBV';
const storageKey='ym-analytics-consent-v1';
const readChoice=()=>{try{return localStorage.getItem(storageKey)}catch{return null}};
const saveChoice=value=>{try{localStorage.setItem(storageKey,value)}catch{}};
const panel=document.createElement('section');
panel.className='analytics-consent';
panel.setAttribute('role','region');
panel.setAttribute('aria-label','Analytics settings');
panel.setAttribute('aria-labelledby','analytics-consent-title');
panel.setAttribute('aria-describedby','analytics-consent-description');
panel.innerHTML=`<h2 id="analytics-consent-title">ANALYTICS SETTINGS</h2><p id="analytics-consent-description">Analytics runs by default to help us understand how people use this website. You can turn it off at any time.</p><p><a href="${new URL('privacy/',document.currentScript.src).href}">Read our privacy notice</a></p><div class="analytics-consent-actions"><button type="button" data-consent="accept">Keep analytics on</button><button type="button" data-consent="reject">Turn analytics off</button></div>`;
const settings=document.createElement('button');
settings.className='analytics-settings';
settings.id='privacy-settings';
settings.type='button';
settings.textContent='Analytics settings';
settings.setAttribute('aria-label','Change analytics settings');
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
  else if(window.ymAnalyticsLoaded)window.gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
}
panel.addEventListener('click',event=>{
  const choice=event.target.closest('[data-consent]')?.dataset.consent;
  if(choice)choose(choice==='accept'?'accepted':'rejected');
});
settings.addEventListener('click',()=>{
  panel.hidden=false;
  settings.hidden=true;
  panel.querySelector('[data-consent="reject"]').focus();
});
const saved=readChoice();
panel.hidden=true;
settings.hidden=false;
if(saved!=='rejected')enableAnalytics();
