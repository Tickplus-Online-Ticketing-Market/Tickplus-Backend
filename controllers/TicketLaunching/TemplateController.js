// controllers/templateController.js

const Template = require("../../models/Template");

class TemplateController {
  async recordClick(templateType) {
    try {
      // Find the template in the database
      const template = await Template.findOne({ type: templateType });

      if (!template) {
        // If template doesn't exist, create it
        const newTemplate = new Template({ type: templateType, clickCount: 1 });
        await newTemplate.save();
      } else {
        // If template exists, update click count
        template.clickCount += 1;
        await template.save();
      }

      return { success: true };
    } catch (error) {
      console.error("Error recording click:", error);
      return { success: false, error: error.message };
    }
  }

  async getClickCounts() {
    try {
      // Get total click counts for both system and custom templates
      const systemTemplate = await Template.findOne({ type: "system" });
      const customTemplate = await Template.findOne({ type: "custom" });

      // Calculate total click count
      const totalClicks =
        (systemTemplate ? systemTemplate.clickCount : 0) +
        (customTemplate ? customTemplate.clickCount : 0);

      // Calculate percentages
      const systemTemplatePercentage = systemTemplate
        ? (systemTemplate.clickCount / totalClicks) * 100
        : 0;
      const customTemplatePercentage = customTemplate
        ? (customTemplate.clickCount / totalClicks) * 100
        : 0;

      return {
        systemClickCount: systemTemplate ? systemTemplate.clickCount : 0,
        customClickCount: customTemplate ? customTemplate.clickCount : 0,
        systemClickPercentage: systemTemplatePercentage.toFixed(2),
        customClickPercentage: customTemplatePercentage.toFixed(2),
      };
    } catch (error) {
      console.error("Error getting click counts:", error);
      return { error: error.message };
    }
  }
}

module.exports = new TemplateController();
