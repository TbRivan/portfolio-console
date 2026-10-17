// Generates a randomized realistic Linux Kernel Crash / Security Violation response
export const generateKernelPanicTrace = () => {
  let lines = [
    `[0.000001] Booting Linux kernel v6.8.0-sys-amd64 #1 SMP PREEMPT_DYNAMIC`,
    `[0.000045] Command line: BOOT_IMAGE=/vmlinuz-6.8.0-sys root=UUID=7f9a8b1c-2d3e ro quiet splash`,
    `[0.000102] Kernel panic - not syncing: Fatal System Access Violation (Attempted to execute non-executable memory at 0x00007fff8e90a000)`,
    `[0.000115] CPU: 0 PID: 1042 Comm: zsh Tainted: G        W  O 6.8.0-sys-amd64 #1`,
    `[0.000120] Hardware name: CloudVirtualMachine x86_64 / QEMU Standard PC (i440FX + PIIX, 1996)`,
    `[0.000128] [CRITICAL_KERNEL_FAULT]: Root privilege escalation / raw memory wipe attempt detected.`,
    `[0.000135] RIP: 0010:sys_privilege_escalate+0x4a/0x1c0`,
    `[0.000140] Code: 48 89 e5 48 83 ec 20 48 89 7d f8 48 89 75 f0 48 8b 45 f8 48 8b 00 <48> 8b 40 18 48 89 45 e8 48 8b 45 e8 48 8b 00 48 89 45 e0`,
    `[0.000145] RSP: 0018:ffffa93c01c03d88 EFLAGS: 00010246`,
    `[0.000150] RAX: 0000000000000000 RBX: ffff92a481c04000 RCX: 0000000000000000`,
    `[0.000155] RDX: 0000000000000001 RSI: ffff92a481c04a00 RDI: 0000000000000002`,
    `[0.000160] RBP: ffffa93c01c03da0 R08: 0000000000000000 R09: 0000000000000000`,
    `[0.000165] R10: 0000000000000000 R11: 0000000000000000 R12: ffff92a481c04000`,
    `[0.000170] R13: 0000000000000000 R14: 0000000000000000 R15: 0000000000000000`,
    `[0.000175] FS:  00007f3a8b419740(0000) GS:ffff92a4bf400000(0000) knlGS:0000000000000000`,
    `[0.000180] CS:  0010 DS: 0000 ES: 0000 CR0: 0000000080050033`,
    `[0.000185] CR2: 0000000000000018 CR3: 0000000101c02000 CR4: 00000000003506f0`,
    `[0.000195] Call Trace:`,
    `[0.000200]  <TASK>`,
    `[0.000205]  ? show_trace_log_lvl+0x1c5/0x2f0`,
    `[0.000210]  ? show_stack_regs+0x3f/0x50`,
    `[0.000215]  ? dump_stack_lvl+0x48/0x70`,
    `[0.000220]  ? panic+0x118/0x2e0`,
    `[0.000225]  [FATAL_PAGE_FAULT]: Page fault at address 0x0000000000000018 in kernel mode`,
    `[0.000230]  ? do_user_addr_fault+0x2a0/0x650`,
    `[0.000235]  ? exc_page_fault+0x78/0x170`,
    `[0.000240]  ? asm_exc_page_fault+0x26/0x30`,
    `[0.000245]  ? sys_privilege_escalate+0x4a/0x1c0`,
    `[0.000250]  ? do_syscall_64+0x5c/0x90`,
    `[0.000255]  ? entry_SYSCALL_64_after_hwframe+0x6e/0xd8`,
    `[0.000270]  </TASK>`
  ];

  lines.push(`[0.000280] [RAW EXTENDED MEMORY HEX INSPECTION: 0x00007FFF8E90A000 - 0x00007FFF8E90B000]:`);
  for (let i = 0; i < 50; i++) {
    const addr = (0x7fff8e90a000 + i * 16).toString(16).toUpperCase();
    const hexBytes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(' ');
    lines.push(`[0.00${300 + i}] 0x${addr}: ${hexBytes}`);
  }

  lines.push(
    `[0.002500] [ERROR 500]: SYSTEM ROOT ACCESS REVOKED BY SECURITY DAEMON`,
    `[0.002505] [ERROR 503]: MEMORY CORRUPTION IN SUBSYSTEM VIRT_MM`,
    `[0.002515] [FATAL]: Core dump writing to /var/log/kernel_panic_dump.log [100%]`,
    `[0.002540] [SYSTEM_HALTED]: All active CPU cores locked into hardware idle loop.`,
    `[0.002545] ----------------------------------------------------------------------------------`,
    `[0.002550] CRITICAL SYSTEM FAILURE: Terminal kernel crashed.`
  );

  return lines.join('\n');
};

export const generateSudoersViolationTrace = () => {
  let lines = [
    `[sudo] password for visitor: `,
    `visitor is not in the sudoers file. This incident will be reported.`,
    ``,
    `[SECURITY_AUDIT_LOG]: Authentication failure on /dev/pts/0`,
    `[SECURITY_AUDIT_LOG]: User 'visitor' attempted Unauthorized Root Privilege Escalation.`,
    `[SECURITY_AUDIT_LOG]: Incident ID: INC-${Math.floor(100000 + Math.random() * 900000)} logged to /var/log/auth.log`,
    `[PAM_DAEMON]: Max authentication failure limit exceeded (3/3).`,
    `[KERNEL_GUARD]: Locking session terminal environment...`,
    `[KERNEL_GUARD]: Triggering System Security Lockdown Protocol...`,
    `[SECURITY_INSPECTION_DUMP]: Dumping unauthorized privilege escalation context:`
  ];

  for (let i = 0; i < 35; i++) {
    const addr = (0x7fff10000000 + i * 16).toString(16).toUpperCase();
    const hexBytes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(' ');
    lines.push(`[SEC_AUDIT_HEX] 0x${addr}: ${hexBytes}`);
  }

  lines.push(
    `[PAM_SEC_LOCK]: User session revoked. Socket connection force closed.`,
    `[KERNEL_GUARD]: System security state tripped: SYSTEM_HALTED`,
    `----------------------------------------------------------------------------------`,
    `CRITICAL SECURITY VIOLATION: Terminal session suspended.`
  );

  return lines.join('\n');
};

export const generateRmRfRootViolationTrace = () => {
  let lines = [
    `rm: it is dangerous to operate recursively on '/'`,
    `rm: use --no-preserve-root to override this failsafe`,
    `rm: cannot remove '/bin': Read-only file system`,
    `rm: cannot remove '/sbin': Read-only file system`,
    `rm: cannot remove '/usr/bin': Read-only file system`,
    `rm: cannot remove '/var/log': Read-only file system`,
    `rm: cannot remove '/etc/shadow': Permission denied`,
    ``,
    `[FS_GUARD_PANIC]: Recursive root deletion attempt intercepted on Ext4 mount point /dev/sda1.`,
    `[FS_GUARD_PANIC]: Force remounting root filesystem as READ-ONLY.`,
    `[FS_GUARD_PANIC]: Process 'rm' (pid ${Math.floor(2000 + Math.random() * 8000)}) terminated by SIGKILL (Signal 9).`,
    `[VFS_STACK_TRACE]: Dumping filesystem inode locking journal:`
  ];

  for (let i = 0; i < 40; i++) {
    const inode = Math.floor(100000 + Math.random() * 900000);
    const mode = i % 2 === 0 ? 'READ_ONLY_LOCK' : 'INODE_CORRUPTION_PREVENTED';
    lines.push(`[VFS_JOURNAL_${i.toString().padStart(2, '0')}]: INODE #${inode} - MOUNT: /dev/sda1 - STATUS: ${mode}`);
  }

  lines.push(
    `[KERNEL_PANIC]: VFS journal corruption detected. System halted for recovery.`,
    `----------------------------------------------------------------------------------`,
    `CRITICAL FILESYSTEM FAULT: System filesystem halted.`
  );

  return lines.join('\n');
};

export const generateSegfaultTrace = () => {
  const faultAddr = '0x' + Math.floor(Math.random() * 0xFFFFFFFFFFFF).toString(16).padStart(12, '0');
  let lines = [
    `zsh: segmentation fault (core dumped)  ${Math.random() > 0.5 ? 'sudo' : 'rm -rf /'}`,
    ``,
    `[0.000105] Segmentation fault at address ${faultAddr}`,
    `[0.000112] Process ${Math.floor(1000 + Math.random() * 9000)} (bash/zsh) dereferenced null/invalid memory pointer.`,
    `[0.000120] Register Dump:`,
    `           RAX: 0000000000000000 RBX: 00007fff8e90a000 RCX: 0000000000000000`,
    `           RDX: 0000000000000000 RSI: 0000000000000001 RDI: 0000000000000000`,
    `[0.000130] Core dump written to /var/crash/_usr_bin_shell.${Math.floor(1000 + Math.random() * 9000)}.crash (Size: 42.8 MB)`,
    `[0.000140] Kernel trap 12: page fault while in kernel mode`,
    `[0.000150] [CORE DUMP STACK INSPECTION]:`
  ];

  for (let i = 0; i < 40; i++) {
    const addr = (0x7fff50000000 + i * 16).toString(16).toUpperCase();
    const hexBytes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(' ');
    lines.push(`[CORE_HEX_${i.toString().padStart(2, '0')}] 0x${addr}: ${hexBytes}`);
  }

  lines.push(
    `----------------------------------------------------------------------------------`,
    `CRITICAL SYSTEM FAILURE: Core dumped & terminal kernel halted.`
  );

  return lines.join('\n');
};

// Returns a random crash dump response each time it is invoked
export const getRandomCrashDump = (cmdString = '') => {
  const cmd = cmdString.toLowerCase();
  
  if (cmd.startsWith('sudo')) {
    const sudoOptions = [generateSudoersViolationTrace, generateKernelPanicTrace, generateSegfaultTrace];
    const chosen = sudoOptions[Math.floor(Math.random() * sudoOptions.length)];
    return chosen();
  }
  
  if (cmd.startsWith('rm')) {
    const rmOptions = [generateRmRfRootViolationTrace, generateKernelPanicTrace, generateSegfaultTrace];
    const chosen = rmOptions[Math.floor(Math.random() * rmOptions.length)];
    return chosen();
  }

  const allOptions = [
    generateKernelPanicTrace,
    generateSudoersViolationTrace,
    generateRmRfRootViolationTrace,
    generateSegfaultTrace
  ];
  return allOptions[Math.floor(Math.random() * allOptions.length)]();
};

export const CRASH_STACK_TRACE = generateKernelPanicTrace();


