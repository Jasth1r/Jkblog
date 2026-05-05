# AWS Aurora MySQL Architecture: A Deep Dive

A paradigm shift in cloud-native databases, separating compute from storage.

---

## I. Background: Bottlenecks of the Traditional Architecture

In a traditional MySQL (InnoDB) architecture, I/O and data processing happen on
the same machine. The compute instance (the `mysqld` process) is responsible
for *all* persistence work.

**Writes are the major bottleneck of traditional MySQL:**

1. **Synchronous Redo Log flush.** On every commit, the redo log must be
   flushed synchronously to local disk to guarantee durability.
2. **Doublewrite buffer & I/O amplification.** When dirty pages are written
   back to disk asynchronously, MySQL must write each 16KB page first to the
   *Doublewrite Buffer*, then to its final location, to avoid torn pages.
   - This guarantees data safety, but **every page is physically written
     twice** — significant write amplification.

In a primary/replica cluster, this expensive persistence work happens on every
node, multiplying both compute and storage cost.

> **Aurora's storage/compute separation was designed exactly for this.**

---

## II. Overview: Storage/Compute Separation and Quorum

Aurora separates the cluster into two distinct kinds of nodes: **storage nodes**
and **compute nodes**.

### A. Compute nodes

Compute nodes only run business logic (SQL parsing, optimization, execution).
They don't hold the authoritative copy of the data.

### B. Storage nodes

Storage nodes hold the durable, replicated copy of the data and apply redo log
records to materialize pages.

### C. The 6-way Quorum

Aurora replicates each data segment **6 ways across 3 Availability Zones**
(2 copies per AZ). It uses a `4/6` write quorum and `3/6` read quorum, which
gives it the ability to tolerate:

- Loss of an entire AZ **plus** one additional node — still readable.
- Loss of an entire AZ — still writable.

---

## III. Why It Wins: Performance and Operational Advantages

- **No more doublewrite.** Compute only ships redo log records; the storage
  layer reconstructs pages.
- **Replicas are cheap.** Read replicas share the same storage volume — no
  log-shipping, no replay lag from physical writes.
- **Backups are continuous.** The storage layer streams to S3 in the background.

---

## IV. Compute Node Memory: NVMe-style Buffer

> _More notes to come — this is a placeholder section._

---

## V. Failover & Transaction Consistency

> _More notes to come._

---

## VI. Backpressure and Durable LSN

> _More notes to come._

---

## VII. Storage Layer Replication and Self-Healing

> _More notes to come._
