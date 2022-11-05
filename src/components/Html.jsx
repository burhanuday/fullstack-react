export default function Html({ children, head }) {
  return (
    <html lang="en">
      <head dangerouslySetInnerHTML={{ __html: head }} />
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<b>Enable JavaScript to run this app.</b>`,
          }}
        />
        {children}
        {import.meta.env.DEV && (
          <script type="module" src="/src/entry-client.jsx"></script>
        )}
      </body>
    </html>
  );
}
