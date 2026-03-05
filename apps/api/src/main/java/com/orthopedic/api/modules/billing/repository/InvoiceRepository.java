package com.orthopedic.api.modules.billing.repository;

import com.orthopedic.api.modules.billing.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);

    @Query("SELECT SUM(i.totalAmount) FROM Invoice i WHERE i.status = 'PAID'")
    java.math.BigDecimal sumTotalRevenue();

    List<Invoice> findByPatientId(UUID patientId);

    List<Invoice> findByAppointmentId(UUID appointmentId);
}
