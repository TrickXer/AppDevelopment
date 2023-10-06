package com.supermarketapp.supermarket.security;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.supermarketapp.supermarket.model.Worker;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class SecurityWorker implements UserDetails {

    @Autowired
    private final Worker worker;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(worker.getRole()));
    }

    @Override
    public String getPassword() {
        return worker.getWorkerPassword();
    }

    @Override
    public String getUsername() {
        return worker.getWorkerName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
}
