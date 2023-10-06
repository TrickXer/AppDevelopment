package com.supermarketapp.supermarket.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.supermarketapp.supermarket.utils.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeaders = request.getHeader("Authorization");

        final String auth;
        final String name;

        if (authHeaders == null || !authHeaders.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        auth = authHeaders.substring(7);
        name = jwtUtil.extractWorkerName(auth);

        if (name != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userdetails = this.userDetailsService.loadUserByUsername(name);

            if (jwtUtil.isTokenValid(name, userdetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        name, null, userdetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
            
            filterChain.doFilter(request, response);
        }
    }

}
