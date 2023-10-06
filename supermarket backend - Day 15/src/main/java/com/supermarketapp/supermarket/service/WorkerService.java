package com.supermarketapp.supermarket.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.supermarketapp.supermarket.model.Worker;
import com.supermarketapp.supermarket.repository.WorkerRepository;
import com.supermarketapp.supermarket.security.SecurityWorker;
import com.supermarketapp.supermarket.utils.JwtUtil;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class WorkerService implements UserDetailsService {

    @Autowired
    private final WorkerRepository workerRepository;

    public Iterable<Worker> getAll() {
        return workerRepository.findByRole("WORKER");
    }

    public Worker getById(String workerId) {
        Optional<Worker> worker = workerRepository.findById(workerId);

        if (!worker.isPresent())
            return null;

        return worker.get();
    }

    public Object getWorkerByEmail(String workerEmail, String password) {
        Optional<Worker> worker = workerRepository.findByWorkerEmail(workerEmail);

        if (!worker.isPresent())
            return null;

        if (!worker.get().getWorkerPassword().equals(password))
            return null;

        return null;
    }

    public Boolean saveWorker(Worker worker) {
        return workerRepository.save(worker) != null ? true : false;
    }

    public Boolean updateWorker(Worker worker) {
        Optional<Worker> workerFromDb = workerRepository.findById(worker.getWorkerId());

        if (!workerFromDb.isPresent())
            return false;

        Worker newWorker = workerFromDb.get();

        String name = worker.getWorkerName();
        String email = worker.getWorkerEmail();
        String password = worker.getWorkerPassword();
        Character gender = worker.getWorkerGender();
        Long contact = worker.getWorkerContact();
        Long salary = worker.getWorkerSalary();
        Boolean inDuty = worker.getIsWorkerInDuty();
        String time = worker.getWorkerTime();
        String role = worker.getRole();

        if (name != null)
            newWorker.setWorkerName(name);

        if (email != null)
            newWorker.setWorkerEmail(email);

        if (password != null)
            newWorker.setWorkerPassword(password);

        if (gender != null)
            newWorker.setWorkerGender(gender);

        if (contact != null)
            newWorker.setWorkerContact(contact);

        if (salary != null)
            newWorker.setWorkerSalary(salary);

        if (inDuty != null)
            newWorker.setIsWorkerInDuty(inDuty);

        if (time != null)
            newWorker.setWorkerTime(time);

        if (role != null)
            newWorker.setRole(role);

        return workerRepository.save(newWorker) != null ? true : false;
    }

    public Boolean deleteWorker(String workerId) throws Exception {
        try {
            workerRepository.deleteById(workerId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String workerName) throws UsernameNotFoundException {
        Optional<Worker> worker = workerRepository.findByWorkerName(workerName);

        return worker.map(SecurityWorker::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
