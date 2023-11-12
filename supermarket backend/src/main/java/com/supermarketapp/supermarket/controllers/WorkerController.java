package com.supermarketapp.supermarket.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.supermarketapp.supermarket.model.Worker;
import com.supermarketapp.supermarket.service.WorkerService;
// import com.supermarketapp.supermarket.utils.JwtUtil;

// import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/workers")
public class WorkerController {

    private final WorkerService workerService;
    // private final JwtUtil jwtUtil;
    
    @GetMapping(value = "/all")
    public ResponseEntity<Object> getWorkers() {
        return ResponseEntity.status(HttpStatus.OK).body(workerService.getAll());
    }
    
    // @GetMapping(value = "/current-worker")
    // public ResponseEntity<Object> getWorker() {
    //     // Claims claims = jwtUtil.extractAllClaims();
    //     return ResponseEntity.status(HttpStatus.OK).body("check");
    // }

    @PostMapping(value = "/add")
    public ResponseEntity<Object> addWorkers(@RequestBody Worker worker) {
        Boolean isWorkerAdded = workerService.saveWorker(worker);
        String response = isWorkerAdded ? "worker added successfully" : "Oops...something went wrong";

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @PutMapping(value = "/update")
    public ResponseEntity<Object> updateWorkers(@RequestBody Worker worker) {
        Boolean isWorkerUpdated = workerService.updateWorker(worker);
        String response = isWorkerUpdated ? "worker data updated successfully" : "Oops...something went wrong";

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @DeleteMapping(value = "/delete")
    public ResponseEntity<Object> deleteWorkers(@RequestParam String workerId) throws Exception {
        Boolean isWorkerAdded = workerService.deleteWorker(workerId);
        String response = isWorkerAdded ? "worker deleted successfully" : "Oops...something went wrong";

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
