/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

// These all have the domain name portion stripped out. The api infrastructure assumes it when we post to it anyhow.

/* eslint-disable max-len */
export const PDF_PRINT_DASHBOARD_6_3 = '/api/reporting/generate/printablePdf?jobParams=(browserTimezone:America%2FNew_York,layout:(id:print),objectType:dashboard,relativeUrls:!(%27%2Fapp%2Fkibana%23%2Fdashboard%2F2ae34a60-3dd4-11e8-b2b9-5d5dc1715159%3F_g%3D(refreshInterval:(display:Off,pause:!!f,value:0),time:(from:!%27Mon%2BApr%2B09%2B2018%2B17:56:08%2BGMT-0400!%27,mode:absolute,to:!%27Wed%2BApr%2B11%2B2018%2B17:56:08%2BGMT-0400!%27))%26_a%3D(description:!%27!%27,filters:!!(),fullScreenMode:!!f,options:(darkTheme:!!f,hidePanelTitles:!!f,useMargins:!!t),panels:!!((embeddableConfig:(),gridData:(h:15,i:!%271!%27,w:24,x:0,y:0),id:!%27145ced90-3dcb-11e8-8660-4d65aa086b3c!%27,panelIndex:!%271!%27,type:visualization,version:!%276.3.0!%27),(embeddableConfig:(),gridData:(h:15,i:!%272!%27,w:24,x:24,y:0),id:e2023110-3dcb-11e8-8660-4d65aa086b3c,panelIndex:!%272!%27,type:visualization,version:!%276.3.0!%27)),query:(language:lucene,query:!%27!%27),timeRestore:!!f,title:!%27couple%2Bpanels!%27,viewMode:view)%27),title:%27couple%20panels%27)';
export const PDF_PRESERVE_DASHBOARD_FILTER_6_3 = '/api/reporting/generate/printablePdf?jobParams=(browserTimezone:America%2FNew_York,layout:(dimensions:(height:439,width:1362),id:preserve_layout),objectType:dashboard,relativeUrls:!(%27%2Fapp%2Fkibana%23%2Fdashboard%2F61c58ad0-3dd3-11e8-b2b9-5d5dc1715159%3F_g%3D(refreshInterval:(display:Off,pause:!!f,value:0),time:(from:!%27Mon%2BApr%2B09%2B2018%2B17:56:08%2BGMT-0400!%27,mode:absolute,to:!%27Wed%2BApr%2B11%2B2018%2B17:56:08%2BGMT-0400!%27))%26_a%3D(description:!%27!%27,filters:!!((!%27$state!%27:(store:appState),meta:(alias:!!n,disabled:!!f,index:a0f483a0-3dc9-11e8-8660-4d65aa086b3c,key:animal,negate:!!f,params:(query:dog,type:phrase),type:phrase,value:dog),query:(match:(animal:(query:dog,type:phrase))))),fullScreenMode:!!f,options:(darkTheme:!!f,hidePanelTitles:!!f,useMargins:!!t),panels:!!((embeddableConfig:(),gridData:(h:15,i:!%271!%27,w:24,x:0,y:0),id:!%2750643b60-3dd3-11e8-b2b9-5d5dc1715159!%27,panelIndex:!%271!%27,type:visualization,version:!%276.3.0!%27),(embeddableConfig:(),gridData:(h:15,i:!%272!%27,w:24,x:24,y:0),id:a16d1990-3dca-11e8-8660-4d65aa086b3c,panelIndex:!%272!%27,type:search,version:!%276.3.0!%27)),query:(language:lucene,query:!%27!%27),timeRestore:!!t,title:!%27dashboard%2Bwith%2Bfilter!%27,viewMode:view)%27),title:%27dashboard%20with%20filter%27)';
export const PDF_PRESERVE_PIE_VISUALIZATION_6_3 = '/api/reporting/generate/printablePdf?jobParams=(browserTimezone:America%2FNew_York,layout:(dimensions:(height:441,width:1002),id:preserve_layout),objectType:visualization,relativeUrls:!(%27%2Fapp%2Fkibana%23%2Fvisualize%2Fedit%2F3fe22200-3dcb-11e8-8660-4d65aa086b3c%3F_g%3D(refreshInterval:(display:Off,pause:!!f,value:0),time:(from:!%27Mon%2BApr%2B09%2B2018%2B17:56:08%2BGMT-0400!%27,mode:absolute,to:!%27Wed%2BApr%2B11%2B2018%2B17:56:08%2BGMT-0400!%27))%26_a%3D(filters:!!(),linked:!!f,query:(language:lucene,query:!%27!%27),uiState:(),vis:(aggs:!!((enabled:!!t,id:!%271!%27,params:(),schema:metric,type:count),(enabled:!!t,id:!%272!%27,params:(field:bytes,missingBucket:!!f,missingBucketLabel:Missing,order:desc,orderBy:!%271!%27,otherBucket:!!f,otherBucketLabel:Other,size:5),schema:segment,type:terms)),params:(addLegend:!!t,addTooltip:!!t,isDonut:!!t,labels:(last_level:!!t,show:!!f,truncate:100,values:!!t),legendPosition:right,type:pie),title:!%27Rendering%2BTest:%2Bpie!%27,type:pie))%27),title:%27Rendering%20Test:%20pie%27)';
export const PDF_PRINT_PIE_VISUALIZATION_FILTER_AND_SAVED_SEARCH_6_3 = '/api/reporting/generate/printablePdf?jobParams=(browserTimezone:America%2FNew_York,layout:(id:print),objectType:visualization,relativeUrls:!(%27%2Fapp%2Fkibana%23%2Fvisualize%2Fedit%2Fbefdb6b0-3e59-11e8-9fc3-39e49624228e%3F_g%3D(refreshInterval:(display:Off,pause:!!f,value:0),time:(from:!%27Mon%2BApr%2B09%2B2018%2B17:56:08%2BGMT-0400!%27,mode:absolute,to:!%27Wed%2BApr%2B11%2B2018%2B17:56:08%2BGMT-0400!%27))%26_a%3D(filters:!!((!%27$state!%27:(store:appState),meta:(alias:!!n,disabled:!!f,index:a0f483a0-3dc9-11e8-8660-4d65aa086b3c,key:animal.keyword,negate:!!f,params:(query:dog,type:phrase),type:phrase,value:dog),query:(match:(animal.keyword:(query:dog,type:phrase))))),linked:!!t,query:(language:lucene,query:!%27!%27),uiState:(),vis:(aggs:!!((enabled:!!t,id:!%271!%27,params:(),schema:metric,type:count),(enabled:!!t,id:!%272!%27,params:(field:name.keyword,missingBucket:!!f,missingBucketLabel:Missing,order:desc,orderBy:!%271!%27,otherBucket:!!f,otherBucketLabel:Other,size:5),schema:segment,type:terms)),params:(addLegend:!!t,addTooltip:!!t,isDonut:!!t,labels:(last_level:!!t,show:!!f,truncate:100,values:!!t),legendPosition:right,type:pie),title:!%27Filter%2BTest:%2Banimals:%2Blinked%2Bto%2Bsearch%2Bwith%2Bfilter!%27,type:pie))%27),title:%27Filter%20Test:%20animals:%20linked%20to%20search%20with%20filter%27)';
export const CSV_DISCOVER_KUERY_AND_FILTER_6_3 = '/api/reporting/generate/csv?jobParams=(conflictedTypesFields:!(),fields:!(%27@timestamp%27,agent,bytes,clientip),indexPatternId:%270bf35f60-3dc9-11e8-8660-4d65aa086b3c%27,metaFields:!(_source,_id,_type,_index,_score),searchRequest:(body:(_source:(excludes:!(),includes:!(%27@timestamp%27,agent,bytes,clientip)),docvalue_fields:!(%27@timestamp%27),query:(bool:(filter:!((bool:(minimum_should_match:1,should:!((match:(clientip:%2773.14.212.83%27)))))),must:!((range:(bytes:(gte:100,lt:1000))),(range:(%27@timestamp%27:(format:epoch_millis,gte:1369165215770,lte:1526931615770)))),must_not:!(),should:!())),script_fields:(),sort:!((%27@timestamp%27:(order:desc,unmapped_type:boolean))),stored_fields:!(%27@timestamp%27,agent,bytes,clientip),version:!t),index:%27logstash-*%27),title:%27Bytes%20and%20kuery%20in%20saved%20search%20with%20filter%27,type:search)';

export const PDF_PRINT_DASHBOARD_6_2 = '/api/reporting/generate/printablePdf?jobParams=(browserTimezone:America%2FNew_York,layout:(id:print),objectType:dashboard,queryString:%27_g%3D(refreshInterval:(display:Off,pause:!!f,value:0),time:(from:!%27Mon%2BApr%2B09%2B2018%2B17:56:08%2BGMT-0400!%27,mode:absolute,to:!%27Wed%2BApr%2B11%2B2018%2B17:56:08%2BGMT-0400!%27))%26_a%3D(description:!%27!%27,filters:!!((!%27$state!%27:(store:appState),meta:(alias:!!n,disabled:!!f,field:isDog,index:a0f483a0-3dc9-11e8-8660-4d65aa086b3c,key:isDog,negate:!!f,params:(value:!!t),type:phrase,value:true),script:(script:(inline:!%27boolean%2Bcompare(Supplier%2Bs,%2Bdef%2Bv)%2B%257Breturn%2Bs.get()%2B%253D%253D%2Bv%3B%257Dcompare(()%2B-%253E%2B%257B%2Breturn%2Bdoc%255B!!!%27animal.keyword!!!%27%255D.value%2B%253D%253D%2B!!!%27dog!!!%27%2B%257D,%2Bparams.value)%3B!%27,lang:painless,params:(value:!!t))))),fullScreenMode:!!f,options:(darkTheme:!!f,hidePanelTitles:!!f,useMargins:!!t),panels:!!((gridData:(h:3,i:!%274!%27,w:6,x:6,y:0),id:edb65990-53ca-11e8-b481-c9426d020fcd,panelIndex:!%274!%27,type:visualization,version:!%276.2.4!%27),(gridData:(h:3,i:!%275!%27,w:6,x:0,y:0),id:!%270644f890-53cb-11e8-b481-c9426d020fcd!%27,panelIndex:!%275!%27,type:visualization,version:!%276.2.4!%27)),query:(language:lucene,query:!%27weightLbs:%253E15!%27),timeRestore:!!t,title:!%27Animal%2BWeights%2B(created%2Bin%2B6.2)!%27,viewMode:view)%27,savedObjectId:%271b2f47b0-53cb-11e8-b481-c9426d020fcd%27)';
export const PDF_PRESERVE_VISUALIZATION_6_2 = '/api/reporting/generate/printablePdf?jobParams=(browserTimezone:America%2FNew_York,layout:(dimensions:(height:441,width:1002),id:preserve_layout),objectType:visualization,queryString:%27_g%3D(refreshInterval:(display:Off,pause:!!f,value:0),time:(from:!%27Mon%2BApr%2B09%2B2018%2B17:56:08%2BGMT-0400!%27,mode:absolute,to:!%27Wed%2BApr%2B11%2B2018%2B17:56:08%2BGMT-0400!%27))%26_a%3D(filters:!!(),linked:!!f,query:(language:lucene,query:!%27weightLbs:%253E10!%27),uiState:(),vis:(aggs:!!((enabled:!!t,id:!%271!%27,params:(),schema:metric,type:count),(enabled:!!t,id:!%272!%27,params:(field:weightLbs,missingBucket:!!f,missingBucketLabel:Missing,order:desc,orderBy:!%271!%27,otherBucket:!!f,otherBucketLabel:Other,size:5),schema:segment,type:terms)),params:(addLegend:!!t,addTooltip:!!t,isDonut:!!t,labels:(last_level:!!t,show:!!f,truncate:100,values:!!t),legendPosition:right,type:pie),title:!%27Weight%2Bin%2Blbs%2Bpie%2Bcreated%2Bin%2B6.2!%27,type:pie))%27,savedObjectId:%270644f890-53cb-11e8-b481-c9426d020fcd%27)';
export const CSV_DISCOVER_FILTER_QUERY_6_2 = '/api/reporting/generate/csv?jobParams=(conflictedTypesFields:!(),fields:!(%27@timestamp%27,animal,sound,weightLbs),indexPatternId:a0f483a0-3dc9-11e8-8660-4d65aa086b3c,metaFields:!(_source,_id,_type,_index,_score),searchRequest:(body:(_source:(excludes:!(),includes:!(%27@timestamp%27,animal,sound,weightLbs)),docvalue_fields:!(%27@timestamp%27),query:(bool:(filter:!(),must:!((query_string:(analyze_wildcard:!t,default_field:%27*%27,query:%27weightLbs:%3E10%27)),(match_phrase:(sound.keyword:(query:growl))),(range:(%27@timestamp%27:(format:epoch_millis,gte:1523310968000,lte:1523483768000)))),must_not:!(),should:!())),script_fields:(),sort:!((%27@timestamp%27:(order:desc,unmapped_type:boolean))),stored_fields:!(%27@timestamp%27,animal,sound,weightLbs),version:!t),index:%27animals-*%27),title:%27Search%20created%20in%206.2%27,type:search)';
