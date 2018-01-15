package kg.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    AuthProvider authProvider;
    
    @Autowired
    BeforeLoginFilter beforeLoginFilter;
    
    @Autowired
    AuthLoginSuccessHandler authLoginSuccessHandler;
    
    @Autowired
    AuthLogoutSuccessHandler authLogoutSuccessHandler;
    
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers("/assets/**","/api/**","/login.html","/401.html","/403.html","/404.html").permitAll()
                    .antMatchers("/index**")
                    .hasAnyRole("MATRIX_USER","SCRIPTER_FILE","SCRIPTER_PIG","SCRIPTER_HIVE","SCRIPTER_HDFS","SCRIPTER_RDMS","SCRIPTER_CONFIG","SCRIPTER_CLUSTER")
                    .anyRequest().authenticated()
            .and()
                .exceptionHandling().accessDeniedPage("/403.html")
            .and()
                .addFilterBefore(beforeLoginFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin()
                    .loginPage("/login.html")
                    .successHandler(authLoginSuccessHandler)
            .and()
                .logout().addLogoutHandler(authLogoutSuccessHandler)
            .and()
                .csrf().disable();
                

    }
}
