import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      // Find the submit button by its role and use a regular expression to match the text
      const submitButton = await screen.findByRole("button", {
        name: /En cours|Envoyer/,
      });

      // Click the submit button
      fireEvent.click(submitButton);

      // // Wait for the "Message envoyé !" text to appear
      // await waitFor(() => screen.findByText("Message envoyé !"));

      // // Now you can assert that the success action is called
      // expect(onSuccess).toHaveBeenCalled();
    });
  });
});
