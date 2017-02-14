/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package kg.auth.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import kg.auth.model.http.HttpResponsePOJO;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class HttpClientUtil {

    public static HttpClient createHttpClient() {
        RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(10 * 1000).build();
        CloseableHttpClient httpclient = HttpClientBuilder.create().setDefaultRequestConfig(requestConfig).build();
        return httpclient;
    }
    
    
    public static HttpResponsePOJO jsonRequest(String url,String json,String requestType) throws Exception{
        HttpClient httpclient = createHttpClient();
        HttpEntityEnclosingRequestBase request=null;
        if("POST".equalsIgnoreCase(requestType)){
             request = new HttpPost(url);
        }else if("PUT".equalsIgnoreCase(requestType)){
             request = new HttpPut(url);
        }
        StringEntity params =new StringEntity(json);
        request.setEntity(params);
        request.addHeader("content-type", "application/json");
        HttpResponsePOJO result = invoke(httpclient, request);
        return result;
    }
    
    public static HttpResponsePOJO jsonRequest(String url,String json,String requestType,Map<String, String> headers) throws Exception{
        HttpClient httpclient = createHttpClient();
//        HttpEntityEnclosingRequestBase request=null;
        HttpRequestBase request = null;
        if("POST".equalsIgnoreCase(requestType)){
             request = new HttpPost(url);
        }else if("PUT".equalsIgnoreCase(requestType)){
             request = new HttpPut(url);
        }else if("GET".equalsIgnoreCase(requestType)){
             request = new HttpGet(url);
        }else if("DELETE".equalsIgnoreCase(requestType)){
             request = new HttpDelete(url);
        }
        if(json!=null){
            if(!"GET".equalsIgnoreCase(requestType)&&(!"DELETE".equalsIgnoreCase(requestType))){
                StringEntity params =new StringEntity(json);
                ((HttpEntityEnclosingRequestBase)request).setEntity(params);
            }
        }
        if(headers==null){
            request.addHeader("content-type", "application/json");
        }else{
            Set<String> keySet_header = headers.keySet();
            for (String key : keySet_header) {
                request.setHeader(key, headers.get(key));
            }
        }
        HttpResponsePOJO result = invoke(httpclient, request);
        return result;
    }
    
    public static HttpResponsePOJO post(String url, Map<String, String> params, Map<String, String> headers) throws IOException {
        HttpClient httpclient = createHttpClient();
        HttpPost request = new HttpPost(url);
        request = (HttpPost) formSubmit(request, params, headers);
        HttpResponsePOJO result = invoke(httpclient, request);
        ((CloseableHttpClient) httpclient).close();
        return result;
    }

    public static HttpResponsePOJO put(String url, Map<String, String> params, Map<String, String> headers) throws IOException {
        HttpClient httpclient = createHttpClient();
        HttpPut request = new HttpPut(url);
        request = (HttpPut) formSubmit(request, params, headers);
        HttpResponsePOJO result = invoke(httpclient, request);
        ((CloseableHttpClient) httpclient).close();
        return result;
    }

    public static HttpResponsePOJO delete(String url) throws IOException {
        HttpClient httpclient = createHttpClient();
        HttpDelete request = new HttpDelete(url);
        HttpResponsePOJO result = invoke(httpclient, request);
        ((CloseableHttpClient) httpclient).close();
        return result;
    }

    public static HttpResponsePOJO get(String url) throws IOException {
        HttpClient httpclient = createHttpClient();
        HttpGet request = new HttpGet(url);
        HttpResponsePOJO result = invoke(httpclient, request);
        ((CloseableHttpClient) httpclient).close();
        return result;
    }

    private static HttpResponsePOJO invoke(HttpClient httpclient,
            HttpUriRequest httpost) throws IOException {
        HttpResponsePOJO result = new HttpResponsePOJO();
        HttpResponse response = sendRequest(httpclient, httpost);
        String body = paseResponse(response);
        result.setBody(body);
        result.setStatusCode(getStatusCode(response));
        result.setResponse(response);
        return result;
    }

    private static String paseResponse(HttpResponse response) throws IOException {
        HttpEntity entity = response.getEntity();
        String body = EntityUtils.toString(entity);
        return body;
    }

    public static HttpResponse sendRequest(HttpClient httpclient,
            HttpUriRequest httpost) throws IOException {
        HttpResponse response = httpclient.execute(httpost);
        return response;
    }

    public static int getStatusCode(HttpResponse response) {
        return response.getStatusLine().getStatusCode();
    }

    private static HttpEntityEnclosingRequestBase formSubmit(HttpEntityEnclosingRequestBase request, Map<String, String> params, Map<String, String> headers) {
        List<BasicNameValuePair> nvps = new ArrayList<>();
        if (params != null) {
            Set<String> keySet = params.keySet();
            for (String key : keySet) {
                nvps.add(new BasicNameValuePair(key, params.get(key)));
            }
            request.setEntity(new UrlEncodedFormEntity(nvps, StandardCharsets.UTF_8));
        }
        if (headers != null) {
            Set<String> keySet_header = headers.keySet();
            for (String key : keySet_header) {
                request.setHeader(key, headers.get(key));
            }
        }
        return request;
    }

}
