---
layout: post
title: "HTB Cyber Apocalypse 2026 - Kernel Pwn Writeup"
date: 2026-02-15
author: mahidulhq
category: Pwn
summary: "Detailed walkthrough of exploiting a Use-After-Free condition in a custom Linux kernel module."
---

## Challenge Overview
We are given a custom Linux kernel image (`bzImage`) with a vulnerable module `vulnerable.ko`.

### Code Analysis
The vulnerability stems from a missing refcount check:

```c
static int device_release(struct inode *inode, struct file *file) {
    kfree(global_object);
    // Missing pointer nullification creates Use-After-Free condition
    return 0;
}
```

### Exploit Code
```python
from pwn import *

p = remote('127.0.0.1', 1337)
p.sendlineafter(b"$ ", b"./exploit")
p.interactive()
```
