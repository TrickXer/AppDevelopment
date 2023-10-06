package com.supermarketapp.supermarket.utils;

import java.security.Key;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.supermarketapp.supermarket.model.Worker;
import com.supermarketapp.supermarket.repository.WorkerRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtUtil {

    @Value("${application.jwt.secret}")
    private String secret;

    @Autowired
    private WorkerRepository workerRepository;

    public String generateToken(UserDetails userDetails) {
        Worker worker = workerRepository.findByWorkerName(userDetails.getUsername()).orElseThrow();

        Map<String, Object> claims = new HashMap<>();

        claims.put("worker", Map.of(
                "uuid", worker.getWorkerId(),
                "name", worker.getWorkerName(),
                "role", worker.getWorkerEmail()));

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuer("Admin")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .signWith(null, SignatureAlgorithm.HS256)
                .compact();
    }
    
    public Key getSigninKey() {
        byte[] key = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(key);
    }

    public String extractWorkerName(String auth) {
        return extractClaims(auth, Claims::getSubject);
    }

    public <T> T extractClaims(String auth, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(auth);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String auth) {
        return Jwts.parserBuilder().setSigningKey(getSigninKey()).build().parseClaimsJws(auth).getBody();
    }

    public Boolean isTokenValid(String name, UserDetails userDetails) {
        return name.equals(userDetails.getUsername());
    }
}
