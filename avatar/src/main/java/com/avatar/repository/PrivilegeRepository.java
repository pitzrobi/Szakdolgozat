package com.avatar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.avatar.model.Privilege;

@Repository
public interface PrivilegeRepository extends JpaRepository<Privilege, Long>{

	Privilege findByName(String name);

    @Override
    void delete(Privilege privilege);
}
