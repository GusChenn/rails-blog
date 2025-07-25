// This script runs in a separate, isolated thread.
self.onmessage = function(event) {
  const userCode = event.data;
  const capturedLogs = [];

  // Override console.log to capture any output.
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    const formattedArgs = args.map(arg =>
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    );
    capturedLogs.push(formattedArgs.join(' '));
  };

  try {
    // Execute the code in a clean function scope.
    new Function(userCode)();
  } catch (e) {
    capturedLogs.push(`Error: ${e.message}`);
  } finally {
    console.log = originalConsoleLog; // Restore original console.log
    self.postMessage(capturedLogs); // Send captured logs back to the main thread.
  }
};
